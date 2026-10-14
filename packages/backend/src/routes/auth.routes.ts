import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';
import { validateBody } from '../middlewares/validate.js';
import { RegisterSchema, LoginSchema } from '@proofly/shared';
import { authRateLimiter } from '../middlewares/rateLimiter.js';
import { authenticateToken } from '../middlewares/auth.js';

export const authRouter = Router();

// Configure cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

authRouter.post(
  '/register',
  authRateLimiter,
  validateBody(RegisterSchema),
  async (req, res, next) => {
    try {
      const { user, token } = await AuthService.register(req.body);
      res.cookie('proofly_session', token, COOKIE_OPTIONS);
      return res.status(201).json({
        success: true,
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/login',
  authRateLimiter,
  validateBody(LoginSchema),
  async (req, res, next) => {
    try {
      const { user, token } = await AuthService.login(req.body);
      res.cookie('proofly_session', token, COOKIE_OPTIONS);
      return res.status(200).json({
        success: true,
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post('/logout', (req, res) => {
  res.clearCookie('proofly_session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return res.status(200).json({
    success: true,
    data: { message: 'Logged out successfully' },
  });
});

authRouter.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const user = await AuthService.getCurrentUser(req.user!.id);
    return res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
});
