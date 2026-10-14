import { Router } from 'express';
import { GitHubService } from '../services/github.service.js';
import { CodingProfilesService } from '../services/codingProfiles.service.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { ExternalCodingProfileSchema } from '@proofly/shared';

export const integrationsRouter = Router();

integrationsRouter.use(authenticateToken, requireRole('STUDENT'));

// GitHub
integrationsRouter.post('/github/sync', async (req, res, next) => {
  try {
    const { token, username } = req.body || {};
    const result = await GitHubService.syncUserRepositories(
      req.user!.id,
      token || username
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

// Coding profiles (LeetCode / HackerRank)
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
