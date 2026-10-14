import { Router } from 'express';
import { StudentService } from '../services/student.service.js';
import { VerificationService } from '../services/verification.service.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import {
  UpdateProfileSchema,
  EducationSchema,
  ExperienceSchema,
  SkillSchema,
  ProjectSchema,
  CertificateSchema,
} from '@proofly/shared';

export const studentRouter = Router();

studentRouter.use(authenticateToken, requireRole('STUDENT'));

// Profile
studentRouter.get('/profile', async (req, res, next) => {
  try {
    const profile = await StudentService.getProfileByUserId(req.user!.id);
    return res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
});

studentRouter.put('/profile', validateBody(UpdateProfileSchema), async (req, res, next) => {
  try {
    const updated = await StudentService.updateProfile(req.user!.id, req.body);
    return res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

// Education
studentRouter.post('/education', validateBody(EducationSchema), async (req, res, next) => {
  try {
    const item = await StudentService.addEducation(req.user!.id, req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

studentRouter.delete('/education/:id', async (req, res, next) => {
  try {
    await StudentService.deleteEducation(req.user!.id, req.params.id);
    return res.json({ success: true, data: { message: 'Education deleted' } });
  } catch (error) {
    next(error);
  }
});

// Experience
studentRouter.post('/experience', validateBody(ExperienceSchema), async (req, res, next) => {
  try {
    const item = await StudentService.addExperience(req.user!.id, req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

studentRouter.delete('/experience/:id', async (req, res, next) => {
  try {
    await StudentService.deleteExperience(req.user!.id, req.params.id);
    return res.json({ success: true, data: { message: 'Experience deleted' } });
  } catch (error) {
    next(error);
  }
});

// Skills
studentRouter.post('/skills', validateBody(SkillSchema), async (req, res, next) => {
  try {
    const item = await StudentService.addSkill(req.user!.id, req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

studentRouter.delete('/skills/:id', async (req, res, next) => {
  try {
    await StudentService.deleteSkill(req.user!.id, req.params.id);
    return res.json({ success: true, data: { message: 'Skill deleted' } });
  } catch (error) {
    next(error);
  }
});

// Projects
studentRouter.post('/projects', validateBody(ProjectSchema), async (req, res, next) => {
  try {
    const item = await StudentService.addProject(req.user!.id, req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

studentRouter.delete('/projects/:id', async (req, res, next) => {
  try {
    await StudentService.deleteProject(req.user!.id, req.params.id);
    return res.json({ success: true, data: { message: 'Project deleted' } });
  } catch (error) {
    next(error);
  }
});

studentRouter.post('/projects/:id/verify', async (req, res, next) => {
  try {
    const result = await VerificationService.verifyProject(req.params.id, req.user!.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// Certificates
studentRouter.post('/certificates', validateBody(CertificateSchema), async (req, res, next) => {
  try {
    const item = await StudentService.addCertificate(req.user!.id, req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

studentRouter.delete('/certificates/:id', async (req, res, next) => {
  try {
    await StudentService.deleteCertificate(req.user!.id, req.params.id);
    return res.json({ success: true, data: { message: 'Certificate deleted' } });
  } catch (error) {
    next(error);
  }
});

studentRouter.post('/certificates/:id/verify', async (req, res, next) => {
  try {
    const result = await VerificationService.verifyCertificate(req.params.id, req.user!.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});
