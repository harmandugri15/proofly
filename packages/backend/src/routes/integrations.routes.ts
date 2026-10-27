import { Router } from 'express';
import { GitHubService } from '../services/github.service.js';
import { CodingProfilesService } from '../services/codingProfiles.service.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { ExternalCodingProfileSchema, ConnectLinkedInSchema } from '@proofly/shared';
import { ValidationError, NotFoundError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';

export const integrationsRouter = Router();

integrationsRouter.use(authenticateToken, requireRole('STUDENT'));

// GitHub
integrationsRouter.post('/github/sync', async (req, res, next) => {
  try {
    const { token, username } = req.body || {};
    const result = await GitHubService.syncUserRepositories(
      req.user!.id,
      username,
      token
    );
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

integrationsRouter.put('/github/repositories/:id', async (req, res, next) => {
  try {
    const { isSelected } = req.body;
    const repo = await GitHubService.toggleRepoSelection(
      req.user!.id,
      req.params.id,
      Boolean(isSelected)
    );
    return res.json({ success: true, data: repo });
  } catch (error) {
    next(error);
  }
});

// Coding profiles (LeetCode / HackerRank / Codeforces)
integrationsRouter.post(
  '/coding-profiles',
  validateBody(ExternalCodingProfileSchema),
  async (req, res, next) => {
    try {
      const profile = await CodingProfilesService.addOrUpdateProfile(
        req.user!.id,
        req.body
      );
      return res.status(201).json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  }
);

integrationsRouter.post('/coding-profiles/:id/sync', async (req, res, next) => {
  try {
    const profile = await CodingProfilesService.syncProfile(
      req.user!.id,
      req.params.id
    );
    return res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
});

integrationsRouter.delete('/coding-profiles/:id', async (req, res, next) => {
  try {
    await CodingProfilesService.deleteProfile(req.user!.id, req.params.id);
    return res.json({ success: true, data: { message: 'Profile disconnected' } });
  } catch (error) {
    next(error);
  }
});

// LinkedIn Integration
integrationsRouter.post(
  '/linkedin',
  validateBody(ConnectLinkedInSchema),
  async (req, res, next) => {
    try {
      const { linkedinUrl } = req.body;
      const cleanUrl = linkedinUrl.trim();

      if (!cleanUrl.toLowerCase().includes('linkedin.com/')) {
        throw new ValidationError('Invalid LinkedIn profile URL. Must be a valid LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)');
      }

      const profile = await prisma.studentProfile.findUnique({
        where: { userId: req.user!.id },
      });
      if (!profile) throw new NotFoundError('Student profile not found');

      const updated = await prisma.studentProfile.update({
        where: { id: profile.id },
        data: {
          linkedinUrl: cleanUrl,
          linkedinVerified: true,
        },
      });

      return res.json({
        success: true,
        data: {
          linkedinUrl: updated.linkedinUrl,
          linkedinVerified: updated.linkedinVerified,
          message: 'LinkedIn profile connected and verified successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

integrationsRouter.delete('/linkedin', async (req, res, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.id },
    });
    if (!profile) throw new NotFoundError('Student profile not found');

    const updated = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        linkedinUrl: null,
        linkedinVerified: false,
      },
    });

    return res.json({
      success: true,
      data: {
        linkedinUrl: null,
        linkedinVerified: false,
        message: 'LinkedIn profile disconnected',
      },
    });
  } catch (error) {
    next(error);
  }
});

