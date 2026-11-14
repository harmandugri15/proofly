import { Router } from 'express';
import { StudentService } from '../services/student.service.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../lib/prisma.js';

export const publicRouter = Router();

// Public Profile view (checks token optionally to see if viewer is a recruiter)
publicRouter.get('/profile/:username', async (req, res, next) => {
  try {
    let viewerRole: string | undefined;
    let recruiterOrgId: string | undefined;

    // Check optional token
    let token = req.cookies?.proofly_session;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as any;
        viewerRole = decoded?.role;
        if (decoded?.role === 'RECRUITER' && decoded?.userId) {
          const recruiter = await prisma.recruiterProfile.findUnique({
            where: { userId: decoded.userId },
            select: { organizationId: true },
          });
          if (recruiter?.organizationId) {
            recruiterOrgId = recruiter.organizationId;
          }
        }
      } catch {}
    }

    const sharePass = (req.query.pass || req.query.token) as string | undefined;

    const profile = await StudentService.getPublicProfileByUsername(
      req.params.username,
      viewerRole,
      sharePass
    );

    // Auto-grant access to logged-in recruiter if viewing via valid Fast-Pass/Public Card pass
    if (recruiterOrgId && profile?.id && sharePass && profile.shareToken === sharePass) {
      await prisma.candidateAccess.upsert({
        where: {
          organizationId_studentProfileId: {
            organizationId: recruiterOrgId,
            studentProfileId: profile.id,
          },
        },
        create: {
          organizationId: recruiterOrgId,
          studentProfileId: profile.id,
          source: 'PUBLIC_CARD',
        },
        update: {},
      }).catch(() => {});
    }

    return res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
});
