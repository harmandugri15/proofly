import { prisma } from '../lib/prisma.js';
import { NotFoundError, ForbiddenError } from '../lib/errors.js';
import { PostInput } from '@proofly/shared';

export class PostService {
  static async listPublishedPosts(tag?: string) {
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: {
        studentProfile: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
    });

    let results = posts;
    if (tag) {
      results = results.filter((p) => {
        const tags: string[] = JSON.parse(p.tags);
        return tags.some((t) => t.toLowerCase() === tag.toLowerCase());
      });
    }

    return results.map(this.formatPost);
  }

  static async getPostBySlug(slug: string) {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        studentProfile: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    if (!post) throw new NotFoundError('Post not found');
    return this.formatPost(post);
  }

  static async getStudentPosts(userId: string) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundError('Student profile not found');

    const posts = await prisma.post.findMany({
      where: { studentProfileId: profile.id },
      orderBy: { updatedAt: 'desc' },
    });

    return posts.map(this.formatPost);
  }

  static async createPost(userId: string, input: PostInput) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundError('Student profile not found');

    const baseSlug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;

    const wordCount = input.content.split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const post = await prisma.post.create({
      data: {
        studentProfileId: profile.id,
        title: input.title,
        slug,
        summary: input.summary,
        content: input.content,
        tags: JSON.stringify(input.tags || []),
        status: input.status,
        publishedAt: input.status === 'PUBLISHED' ? new Date() : null,
        readTimeMinutes,
      },
      include: {
        studentProfile: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    return this.formatPost(post);
  }

  static async updatePost(userId: string, postId: string, input: Partial<PostInput>) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundError('Student profile not found');

    const existing = await prisma.post.findFirst({
      where: { id: postId, studentProfileId: profile.id },
    });

    if (!existing) throw new NotFoundError('Post not found');

    const data: any = {};
    if (input.title !== undefined) data.title = input.title;
    if (input.summary !== undefined) data.summary = input.summary;
    if (input.content !== undefined) {
      data.content = input.content;
      const wordCount = input.content.split(/\s+/).length;
      data.readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    }
    if (input.tags !== undefined) data.tags = JSON.stringify(input.tags);
    if (input.status !== undefined) {
      data.status = input.status;
      if (input.status === 'PUBLISHED' && !existing.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    const post = await prisma.post.update({
      where: { id: existing.id },
      data,
      include: {
        studentProfile: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    return this.formatPost(post);
  }

  static async deletePost(userId: string, postId: string) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundError('Student profile not found');

    const existing = await prisma.post.findFirst({
      where: { id: postId, studentProfileId: profile.id },
    });

    if (!existing) throw new NotFoundError('Post not found');

    await prisma.post.delete({ where: { id: existing.id } });
  }

  private static formatPost(post: any) {
    return {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      authorName: post.studentProfile?.user?.name || 'Author',
      authorUsername: post.studentProfile?.username,
      authorAvatar: post.studentProfile?.avatarUrl,
    };
  }
}
