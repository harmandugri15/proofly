import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { ConflictError, UnauthorizedError, NotFoundError, BadRequestError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';
import { EmailService } from './email.service.js';
import {
  RegisterInput,
  LoginInput,
  ResetPasswordInput,
} from '@proofly/shared';

export class AuthService {
  static async register(input: RegisterInput) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictError('An account with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(input.password, salt);

    // Create user and profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email.toLowerCase(),
          passwordHash,
          name: input.name,
          role: input.role,
          isEmailVerified: false,
        },
      });

      if (input.role === 'STUDENT') {
        const baseUsername = input.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        let username = baseUsername || 'user';
        const count = await tx.studentProfile.count({
          where: { username: { startsWith: username } },
        });
        if (count > 0) {
          username = `${username}${count + 1}`;
        }

        await tx.studentProfile.create({
          data: {
            userId: user.id,
            username,
            headline: 'Aspiring Software Engineer',
            bio: '',
            visibility: 'PUBLIC',
          },
        });
      } else if (input.role === 'RECRUITER') {
        const orgName = input.organizationName || `${input.name}'s Organization`;
        const slug = orgName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000);

        let org = await tx.organization.findFirst({
          where: { name: orgName },
        });

        if (!org) {
          org = await tx.organization.create({
            data: {
              name: orgName,
              slug,
              websiteUrl: input.organizationWebsite || null,
            },
          });
        }

        await tx.recruiterProfile.create({
          data: {
            userId: user.id,
            organizationId: org.id,
            fullName: input.name,
            title: input.title || 'Technical Recruiter',
          },
        });
      }

      await tx.auditEvent.create({
        data: {
          actorId: user.id,
          action: 'USER_REGISTERED',
          resourceType: 'USER',
          resourceId: user.id,
          payload: JSON.stringify({ role: user.role }),
        },
      });

      return user;
    });

    const token = this.generateToken(result.id, result.role, result.email);
    return { user: this.sanitizeUser(result), token };
  }

  static async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
      include: {
        studentProfile: { select: { id: true, username: true } },
        recruiterProfile: { select: { id: true, organizationId: true } },
      },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedError(
        'This account was created via Google OAuth. Please sign in with Google or use forgot password to set a password.'
      );
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.role, user.email);

    await prisma.auditEvent.create({
      data: {
        actorId: user.id,
        action: 'USER_LOGGED_IN',
        resourceType: 'USER',
        resourceId: user.id,
      },
    });

    return { user: this.sanitizeUser(user), token };
  }

  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        recruiterProfile: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User account not found');
    }

    return this.sanitizeUser(user);
  }

  // ============================================================================
  // Password Reset & OTP Flow
  // ============================================================================

  static async forgotPassword(email: string) {
    const targetEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    // To prevent user enumeration attacks, always respond with a success message
    if (!user) {
      logger.info(`Forgot password requested for non-existent email: ${targetEmail}`);
      return {
        success: true,
        message: 'If an account with this email exists, a 6-digit verification code has been dispatched.',
      };
    }

    // Generate secure 6-digit numeric OTP and 32-byte hex reset token
    const otp = crypto.randomInt(100000, 999999).toString();
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetOtp: otp,
        passwordResetToken: resetToken,
        passwordResetExpires: expiresAt,
      },
    });

    // Dispatch email
    const emailResult = await EmailService.sendPasswordResetOtp({
      to: user.email,
      name: user.name,
      otp,
      resetToken,
    });

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        actorId: user.id,
        action: 'PASSWORD_RESET_REQUESTED',
        resourceType: 'USER',
        resourceId: user.id,
      },
    });

    return {
      success: true,
      message: 'If an account with this email exists, a 6-digit verification code has been dispatched.',
      devOtp: emailResult.devOtp,
    };
  }

  static async verifyResetOtp(email: string, otp: string) {
    const targetEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (
      !user ||
      !user.passwordResetOtp ||
      user.passwordResetOtp !== otp.trim() ||
      !user.passwordResetExpires ||
      user.passwordResetExpires < new Date()
    ) {
      throw new BadRequestError('Invalid or expired 6-digit verification code. Please request a new one.');
    }

    return {
      success: true,
      valid: true,
      resetToken: user.passwordResetToken,
    };
  }

  static async resetPassword(input: ResetPasswordInput) {
    const targetEmail = input.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestError('Password reset request has expired or does not exist. Please request a new code.');
    }

    // Must match either OTP or token
    const isOtpValid = input.otp && user.passwordResetOtp === input.otp.trim();
    const isTokenValid = input.token && user.passwordResetToken === input.token.trim();

    if (!isOtpValid && !isTokenValid) {
      throw new BadRequestError('Invalid verification code or token. Please check your credentials.');
    }

    // Hash new strong password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(input.newPassword, salt);

    // Update password and revoke all active sessions and reset codes in transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          passwordResetOtp: null,
          passwordResetToken: null,
          passwordResetExpires: null,
          isEmailVerified: true, // Resetting via email proves email ownership
        },
      });

      await tx.session.deleteMany({
        where: { userId: user.id },
      });

      await tx.auditEvent.create({
        data: {
          actorId: user.id,
          action: 'PASSWORD_RESET_COMPLETED',
          resourceType: 'USER',
          resourceId: user.id,
        },
      });
    });

    // Dispatch confirmation email
    await EmailService.sendPasswordChangedNotification({
      to: user.email,
      name: user.name,
    });

    logger.info(`🔒 Password successfully reset for user ${user.email}`);

    return {
      success: true,
      message: 'Password reset successfully! You can now log in with your new credentials.',
    };
  }

  // ============================================================================
  // Google OAuth 2.0 Flow
  // ============================================================================

  static getGoogleAuthUrl(role: string = 'STUDENT'): string {
    if (!env.GOOGLE_CLIENT_ID) {
      throw new BadRequestError(
        'Google OAuth is not configured. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your environment variables.'
      );
    }

    const state = JSON.stringify({ role });
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_CALLBACK_URL,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
      state: Buffer.from(state).toString('base64'),
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  static async handleGoogleOAuthCallback(code: string, stateStr?: string) {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      throw new BadRequestError('Google OAuth is not configured on the server.');
    }

    let role = 'STUDENT';
    if (stateStr) {
      try {
        const decoded = Buffer.from(stateStr, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        if (parsed.role === 'RECRUITER' || parsed.role === 'STUDENT') {
          role = parsed.role;
        }
      } catch {
        // Fallback default
      }
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.text();
      logger.error(`❌ Google OAuth token exchange failed: ${errBody}`);
      throw new UnauthorizedError('Failed to authenticate with Google. Please try again.');
    }

    const tokenData = (await tokenResponse.json()) as any;
    const accessToken = tokenData.access_token;

    // Fetch user info from Google
    const userinfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userinfoResponse.ok) {
      throw new UnauthorizedError('Failed to fetch user profile from Google.');
    }

    const userinfo = (await userinfoResponse.json()) as any;
    return this.handleGoogleUser({
      googleId: userinfo.sub,
      email: userinfo.email,
      name: userinfo.name || userinfo.email.split('@')[0],
      avatarUrl: userinfo.picture,
      role,
    });
  }

  static async handleGoogleToken(credential: string, role: string = 'STUDENT') {
    // Verify Google ID token via Google's tokeninfo endpoint
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    if (!response.ok) {
      throw new UnauthorizedError('Invalid Google credential token.');
    }

    const payload = (await response.json()) as any;
    if (!payload.email || !payload.sub) {
      throw new UnauthorizedError('Google identity token lacks required email information.');
    }

    return this.handleGoogleUser({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name || payload.email.split('@')[0],
      avatarUrl: payload.picture,
      role,
    });
  }

  private static async handleGoogleUser({
    googleId,
    email,
    name,
    avatarUrl,
    role = 'STUDENT',
  }: {
    googleId: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role?: string;
  }) {
    const targetEmail = email.toLowerCase().trim();

    // 1. Check if user already exists by googleId
    let user = await prisma.user.findUnique({
      where: { googleId },
      include: {
        studentProfile: { select: { id: true, username: true } },
        recruiterProfile: { select: { id: true, organizationId: true } },
      },
    });

    // 2. Check if user exists by email (Account Linking)
    if (!user) {
      const existingByEmail = await prisma.user.findUnique({
        where: { email: targetEmail },
        include: {
          studentProfile: { select: { id: true, username: true } },
          recruiterProfile: { select: { id: true, organizationId: true } },
        },
      });

      if (existingByEmail) {
        user = await prisma.user.update({
          where: { id: existingByEmail.id },
          data: {
            googleId,
            avatarUrl: avatarUrl || existingByEmail.avatarUrl,
            isEmailVerified: true,
          },
          include: {
            studentProfile: { select: { id: true, username: true } },
            recruiterProfile: { select: { id: true, organizationId: true } },
          },
        });
      }
    }

    // 3. If new user, create user and profile in transaction
    if (!user) {
      user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email: targetEmail,
            name,
            googleId,
            avatarUrl: avatarUrl || null,
            role,
            isEmailVerified: true,
          },
        });

        if (role === 'STUDENT') {
          const baseUsername = name.toLowerCase().replace(/[^a-z0-9]/g, '');
          let username = baseUsername || 'user';
          const count = await tx.studentProfile.count({
            where: { username: { startsWith: username } },
          });
          if (count > 0) {
            username = `${username}${count + 1}`;
          }

          await tx.studentProfile.create({
            data: {
              userId: newUser.id,
              username,
              headline: 'Aspiring Software Engineer',
              bio: '',
              visibility: 'PUBLIC',
            },
          });
        } else if (role === 'RECRUITER') {
          const orgName = `${name}'s Organization`;
          const slug = orgName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000);

          const org = await tx.organization.create({
            data: {
              name: orgName,
              slug,
            },
          });

          await tx.recruiterProfile.create({
            data: {
              userId: newUser.id,
              organizationId: org.id,
              fullName: name,
              title: 'Technical Recruiter',
            },
          });
        }

        await tx.auditEvent.create({
          data: {
            actorId: newUser.id,
            action: 'USER_REGISTERED_GOOGLE_OAUTH',
            resourceType: 'USER',
            resourceId: newUser.id,
          },
        });

        return tx.user.findUniqueOrThrow({
          where: { id: newUser.id },
          include: {
            studentProfile: { select: { id: true, username: true } },
            recruiterProfile: { select: { id: true, organizationId: true } },
          },
        });
      });
    }

    if (!user) {
      throw new NotFoundError('User account not found');
    }

    // Record login audit event
    await prisma.auditEvent.create({
      data: {
        actorId: user.id,
        action: 'USER_LOGGED_IN_GOOGLE_OAUTH',
        resourceType: 'USER',
        resourceId: user.id,
      },
    });

    const token = this.generateToken(user.id, user.role, user.email);
    return { user: this.sanitizeUser(user), token };
  }

  private static generateToken(userId: string, role: string, email: string): string {
    return jwt.sign({ userId, role, email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
  }

  private static sanitizeUser(user: any) {
    const { passwordHash, emailVerificationToken, passwordResetToken, passwordResetOtp, ...safeUser } = user;
    return safeUser;
  }
}
