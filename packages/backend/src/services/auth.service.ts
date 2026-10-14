import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../lib/errors.js';
import { RegisterInput, LoginInput } from '@proofly/shared';

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
        },
      });

      if (input.role === 'STUDENT') {
        // Generate unique username from name or email
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

      // Record audit event
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

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.role, user.email);

    // Record audit event
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
      throw new NotFoundError('User not found');
    }

    return this.sanitizeUser(user);
  }

  private static generateToken(userId: string, role: string, email: string): string {
    return jwt.sign(
      { userId, role, email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );
  }

  private static sanitizeUser(user: any) {
    const { passwordHash, emailVerificationToken, passwordResetToken, ...safeUser } = user;
    return safeUser;
  }
}
