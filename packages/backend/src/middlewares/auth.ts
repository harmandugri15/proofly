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
  organizationId?: string | null;
  studentProfileId?: string | null;
  recruiterProfileId?: string | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
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

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      role: UserRole;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        studentProfile: { select: { id: true } },
        recruiterProfile: { select: { id: true, organizationId: true } },
      },
    });

    if (!user) {
      return next(new UnauthorizedError('User account not found'));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
      name: user.name,
      studentProfileId: user.studentProfile?.id || null,
      recruiterProfileId: user.recruiterProfile?.id || null,
      organizationId: user.recruiterProfile?.organizationId || null,
    };

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
