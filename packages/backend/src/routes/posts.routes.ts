import { Router } from 'express';
import { PostService } from '../services/post.service.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { PostSchema } from '@proofly/shared';

export const postsRouter = Router();

// Public: List all published posts
postsRouter.get('/', async (req, res, next) => {
  try {
    const { tag } = req.query;
    const posts = await PostService.listPublishedPosts(tag as string);
    return res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
});

// Public: Get post by slug
postsRouter.get('/read/:slug', async (req, res, next) => {
  try {
    const post = await PostService.getPostBySlug(req.params.slug);
    return res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// Student: Get my posts
postsRouter.get('/my-posts', authenticateToken, requireRole('STUDENT'), async (req, res, next) => {
  try {
    const posts = await PostService.getStudentPosts(req.user!.id);
    return res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
});

// Student: Create post
postsRouter.post(
  '/',
  authenticateToken,
  requireRole('STUDENT'),
  validateBody(PostSchema),
  async (req, res, next) => {
    try {
      const post = await PostService.createPost(req.user!.id, req.body);
      return res.status(201).json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  }
);

// Student: Update post
postsRouter.put(
  '/:id',
  authenticateToken,
  requireRole('STUDENT'),
  async (req, res, next) => {
    try {
      const post = await PostService.updatePost(req.user!.id, req.params.id, req.body);
      return res.json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  }
);

// Student: Delete post
postsRouter.delete(
  '/:id',
  authenticateToken,
  requireRole('STUDENT'),
  async (req, res, next) => {
    try {
      await PostService.deletePost(req.user!.id, req.params.id);
      return res.json({ success: true, data: { message: 'Post deleted' } });
    } catch (error) {
      next(error);
    }
  }
);
