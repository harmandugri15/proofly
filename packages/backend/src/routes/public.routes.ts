import { Router } from 'express';
import { StudentService } from '../services/student.service.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const publicRouter = Router();

// Public Profile view (checks token optionally to see if viewer is a recruiter)
publicRouter.get('/profile/:username', async (req, res, next) => {
  try {
    let viewerRole: string | undefined;

    // Check optional token
    let token = req.cookies?.proofly_session;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as any;
        viewerRole = decoded?.role;
      } catch {}
    }

    const profile = await StudentService.getPublicProfileByUsername(
      req.params.username,
      viewerRole
    );

    return res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
});
