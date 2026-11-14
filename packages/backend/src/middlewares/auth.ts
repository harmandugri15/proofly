import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError, ForbiddenError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
import { UserRole } from '@proofly/shared';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  sessionId?: string;
  organizationId?: string | null;
  studentProfileId?: string | null;
  recruiterProfileId?: string | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
      token?: string;
    }
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Check cookie first, then Authorization header
    let token = req.cookies?.proofly_session;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return next(new UnauthorizedError('Authentication token missing'));
    }

    // Cryptographic token verification
    jwt.verify(token, env.JWT_SECRET);

    // Database active session verification
    const dbSession = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            studentProfile: { select: { id: true } },
            recruiterProfile: { select: { id: true, organizationId: true } },
          },
        },
      },
    });

    if (!dbSession) {
      return next(new UnauthorizedError('Session has ended or was revoked. Please log in again.'));
    }

    if (dbSession.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: dbSession.id } }).catch(() => {});
      return next(new UnauthorizedError('Session has expired. Please log in again.'));
    }

    const user = dbSession.user;
    if (!user) {
      return next(new UnauthorizedError('User account not found'));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
      name: user.name,
      sessionId: dbSession.id,
      studentProfileId: user.studentProfile?.id || null,
      recruiterProfileId: user.recruiterProfile?.id || null,
      organizationId: user.recruiterProfile?.organizationId || null,
    };
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Session has expired. Please log in again.'));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError('Invalid authentication session.'));
    }
    next(error);
  }
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          `Access forbidden: requires one of [${allowedRoles.join(', ')}] role`
        )
      );
    }

    next();
  };
}
