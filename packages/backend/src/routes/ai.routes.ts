import { Router } from 'express';
import { AIService } from '../services/ai.service.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { aiAgentRateLimiter } from '../middlewares/rateLimiter.js';
import { validateBody } from '../middlewares/validate.js';
import {
  RecruiterResearchQuerySchema,
  CandidateMatchQuerySchema,
} from '@proofly/shared';

export const aiRouter = Router();

aiRouter.use(authenticateToken, aiAgentRateLimiter);

// Agent 1: Student Profile Completeness Assistant
aiRouter.post(
  '/profile-completeness',
  requireRole('STUDENT'),
  async (req, res, next) => {
    try {
      const result = await AIService.analyzeProfileCompleteness(req.user!.id);
      return res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
);

// Agent 4: Recruiter Research Assistant (with citations & grounding)
aiRouter.post(
  ['/research-candidate', '/recruiter-research'],
  requireRole('RECRUITER'),
  validateBody(RecruiterResearchQuerySchema),
  async (req, res, next) => {
    try {
      const { candidateId, query } = req.body;
      const result = await AIService.researchCandidate(
        candidateId,
        query,
        req.user?.organizationId || undefined
      );
      return res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
);

// Agent 3 & 5: Explainable Candidate Matching
aiRouter.post(
  ['/match-candidate', '/candidate-match'],
  requireRole('RECRUITER'),
  validateBody(CandidateMatchQuerySchema),
  async (req, res, next) => {
    try {
      const {
        candidateId,
        jobId,
        jobDescription,
        requiredSkills,
        preferredSkills,
      } = req.body;

      const result = await AIService.matchCandidateToJob(
        candidateId,
        jobId,
        jobDescription,
        requiredSkills,
        preferredSkills,
        req.user?.organizationId || undefined
      );

      return res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
);
