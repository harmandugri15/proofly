import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';
import { validateBody } from '../middlewares/validate.js';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  VerifyResetOtpSchema,
  ResetPasswordSchema,
  GoogleAuthTokenSchema,
  VerifyEmailSchema,
  ResendVerificationSchema,
} from '@proofly/shared';
import { authRateLimiter } from '../middlewares/rateLimiter.js';
import { authenticateToken } from '../middlewares/auth.js';
import { env } from '../config/env.js';

export const authRouter = Router();

function extractRequestMeta(req: any) {
  const ipAddress =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || null;
  const userAgent = (req.headers['user-agent'] as string) || null;
  return { ipAddress, userAgent };
}


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
      const meta = extractRequestMeta(req);
      const result = await AuthService.register(req.body, meta);
      // Registration creates the unverified account and sends 6-digit confirmation code.
      // Session & JWT are minted upon email verification.
      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/verify-email',
  authRateLimiter,
  validateBody(VerifyEmailSchema),
  async (req, res, next) => {
    try {
      const meta = extractRequestMeta(req);
      const { user, token } = await AuthService.verifyEmail(req.body, meta);
      res.cookie('proofly_session', token, COOKIE_OPTIONS);
      return res.status(200).json({
        success: true,
        data: {
          user,
          token,
          message: 'Email confirmed successfully! Your workspace session has been created.',
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/resend-verification',
  authRateLimiter,
  validateBody(ResendVerificationSchema),
  async (req, res, next) => {
    try {
      const result = await AuthService.resendVerificationOtp(req.body.email);
      return res.status(200).json({
        success: true,
        data: result,
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
      const meta = extractRequestMeta(req);
      const { user, token } = await AuthService.login(req.body, meta);
      const cookieOptions = {
        ...COOKIE_OPTIONS,
        maxAge: req.body.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
      };
      res.cookie('proofly_session', token, cookieOptions);
      return res.status(200).json({
        success: true,
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post('/logout', async (req, res, next) => {
  try {
    let token = req.cookies?.proofly_session;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }
    if (token) {
      await AuthService.logout(token);
    }
    res.clearCookie('proofly_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(200).json({
      success: true,
      data: { message: 'Logged out successfully' },
    });
  } catch (error) {
    next(error);
  }
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


// ============================================================================
// Active Sessions Management Routes
// ============================================================================

authRouter.get('/sessions', authenticateToken, async (req, res, next) => {
  try {
    const sessions = await AuthService.getUserSessions(req.user!.id, req.token);
    return res.status(200).json({
      success: true,
      data: { sessions },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.delete('/sessions/:id', authenticateToken, async (req, res, next) => {
  try {
    const result = await AuthService.revokeSession(req.user!.id, req.params.id);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/sessions/revoke-others', authenticateToken, async (req, res, next) => {
  try {
    const result = await AuthService.revokeOtherSessions(req.user!.id, req.token);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================================
// Password Reset & OTP Routes
// ============================================================================

authRouter.post(
  '/forgot-password',
  authRateLimiter,
  validateBody(ForgotPasswordSchema),
  async (req, res, next) => {
    try {
      const result = await AuthService.forgotPassword(req.body.email);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/verify-reset-otp',
  authRateLimiter,
  validateBody(VerifyResetOtpSchema),
  async (req, res, next) => {
    try {
      const result = await AuthService.verifyResetOtp(req.body.email, req.body.otp);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/reset-password',
  authRateLimiter,
  validateBody(ResetPasswordSchema),
  async (req, res, next) => {
    try {
      const result = await AuthService.resetPassword(req.body);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================================
// Google OAuth 2.0 Routes
// ============================================================================

authRouter.get('/google', (req, res, next) => {
  try {
    const role = (req.query.role as string) || 'STUDENT';
    const host = req.get('host');
    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';

    // Intelligently compute redirect URL:
    // If GOOGLE_CALLBACK_URL is explicitly set and not localhost on a production host, use it.
    // Otherwise construct the callback using the active domain.
    let callbackUrl = env.GOOGLE_CALLBACK_URL;
    if (host && (!callbackUrl || !callbackUrl.includes(host))) {
      callbackUrl = `${proto}://${host}${env.API_PREFIX}/auth/google/callback`;
    }

    const authUrl = AuthService.getGoogleAuthUrl(role, callbackUrl);
    return res.redirect(authUrl);
  } catch (error) {
    next(error);
  }
});

authRouter.get('/google/callback', async (req, res) => {
  const host = req.get('host');
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const frontendBase =
    env.FRONTEND_URL && (!env.FRONTEND_URL.includes('localhost') || !host || host.includes('localhost'))
      ? env.FRONTEND_URL
      : `${proto}://${host}`;

  try {
    const { code, state, error } = req.query;

    if (error) {
      return res.redirect(`${frontendBase}/login?error=${encodeURIComponent(String(error))}`);
    }

    if (!code || typeof code !== 'string') {
      return res.redirect(`${frontendBase}/login?error=missing_google_code`);
    }

    const meta = extractRequestMeta(req);
    const { user, token } = await AuthService.handleGoogleOAuthCallback(
      code,
      typeof state === 'string' ? state : undefined,
      meta
    );

    res.cookie('proofly_session', token, COOKIE_OPTIONS);
    const redirectPath = user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard';
    return res.redirect(
      `${frontendBase}/auth/callback?token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(redirectPath)}`
    );
  } catch (error: any) {
    return res.redirect(`${frontendBase}/login?error=${encodeURIComponent(error?.message || 'oauth_failed')}`);
  }
});

authRouter.post(
  '/google/token',
  authRateLimiter,
  validateBody(GoogleAuthTokenSchema),
  async (req, res, next) => {
    try {
      const meta = extractRequestMeta(req);
      const { user, token } = await AuthService.handleGoogleToken(req.body.credential, req.body.role, meta);
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
