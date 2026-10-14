import { Router } from 'express';
import { RecruiterService } from '../services/recruiter.service.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { validateBody, validateQuery } from '../middlewares/validate.js';
import {
  JobPostingSchema,
  ShortlistSchema,
  RecruiterNoteSchema,
  CandidateSearchQuerySchema,
} from '@proofly/shared';

export const recruiterRouter = Router();

recruiterRouter.use(authenticateToken, requireRole('RECRUITER'));

// Candidate Search
recruiterRouter.get(
  '/candidates',
  validateQuery(CandidateSearchQuerySchema),
  async (req, res, next) => {
    try {
      const result = await RecruiterService.searchCandidates(req.query as any);
      return res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
);

// Candidate Detail
recruiterRouter.get('/candidates/:id', async (req, res, next) => {
  try {
    const candidate = await RecruiterService.getCandidateProfile(
      req.params.id,
      req.user!.organizationId!
    );
    return res.json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
});

// Candidate Comparison
recruiterRouter.post('/candidates/compare', async (req, res, next) => {
  try {
    const { candidateIds } = req.body;
    const candidates = await RecruiterService.compareCandidates(
      candidateIds,
      req.user!.organizationId!
    );
    return res.json({ success: true, data: candidates });
  } catch (error) {
    next(error);
  }
});

// Job Postings
recruiterRouter.get('/jobs', async (req, res, next) => {
  try {
    const jobs = await RecruiterService.listJobs(req.user!.organizationId!);
    return res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
});

recruiterRouter.post('/jobs', validateBody(JobPostingSchema), async (req, res, next) => {
  try {
    const job = await RecruiterService.createJob(
      req.user!.organizationId!,
      req.body
    );
    return res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
});

recruiterRouter.delete('/jobs/:id', async (req, res, next) => {
  try {
    await RecruiterService.deleteJob(req.user!.organizationId!, req.params.id);
    return res.json({ success: true, data: { message: 'Job deleted' } });
  } catch (error) {
    next(error);
  }
});

// Shortlists
recruiterRouter.get('/shortlists', async (req, res, next) => {
  try {
    const shortlists = await RecruiterService.listShortlists(
      req.user!.organizationId!
    );
    return res.json({ success: true, data: shortlists });
  } catch (error) {
    next(error);
  }
});

recruiterRouter.post(
  '/shortlists',
  validateBody(ShortlistSchema),
  async (req, res, next) => {
    try {
      const shortlist = await RecruiterService.createShortlist(
        req.user!.organizationId!,
        req.body
      );
      return res.status(201).json({ success: true, data: shortlist });
    } catch (error) {
      next(error);
    }
  }
);

recruiterRouter.post('/shortlists/:id/candidates', async (req, res, next) => {
  try {
    const { studentProfileId } = req.body;
    const entry = await RecruiterService.addCandidateToShortlist(
      req.user!.organizationId!,
      req.params.id,
      studentProfileId
    );
    return res.status(201).json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
});

recruiterRouter.delete(
  '/shortlists/:id/candidates/:candidateId',
  async (req, res, next) => {
    try {
      await RecruiterService.removeCandidateFromShortlist(
        req.user!.organizationId!,
        req.params.id,
        req.params.candidateId
      );
      return res.json({ success: true, data: { message: 'Candidate removed' } });
    } catch (error) {
      next(error);
    }
  }
);

// Recruiter Private Notes
recruiterRouter.post(
  '/notes',
  validateBody(RecruiterNoteSchema),
  async (req, res, next) => {
    try {
      const note = await RecruiterService.addNote(
        req.user!.organizationId!,
        req.user!.recruiterProfileId!,
        req.body
      );
      return res.status(201).json({ success: true, data: note });
    } catch (error) {
      next(error);
    }
  }
);
