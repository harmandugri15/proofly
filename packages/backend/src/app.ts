import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { standardRateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Routers
import { healthRouter } from './routes/health.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { studentRouter } from './routes/student.routes.js';
import { integrationsRouter } from './routes/integrations.routes.js';
import { recruiterRouter } from './routes/recruiter.routes.js';
import { postsRouter } from './routes/posts.routes.js';
import { aiRouter } from './routes/ai.routes.js';
import { publicRouter } from './routes/public.routes.js';

export const app = express();

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible SPA serving in development
  })
);

import path from 'path';
import fs from 'fs';

const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, same-origin, curl)
      if (!origin) return callback(null, true);

      const isExplicitlyAllowed =
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.onrender.com');

      if (isExplicitlyAllowed) {
        callback(null, true);
      } else {
        // Allow origin dynamically to support multiple preview/production deployments
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser(env.COOKIE_SECRET));

// Standard Global Rate Limiting
app.use(standardRateLimiter);

// API Version 1 Routes
const api = express.Router();
api.use('/health', healthRouter);
api.use('/auth', authRouter);
api.use('/student', studentRouter);
api.use('/integrations', integrationsRouter);
api.use('/recruiter', recruiterRouter);
api.use('/posts', postsRouter);
api.use('/ai', aiRouter);
api.use('/public', publicRouter);

app.use(env.API_PREFIX, api);

// SPA Static Serving (for unified single-container / single-app production hosting)
const candidateFrontendPaths = [
  path.resolve(process.cwd(), 'packages/frontend/dist'),
  path.resolve(process.cwd(), '../frontend/dist'),
  path.resolve(process.cwd(), '../../packages/frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), 'dist/frontend'),
];

const resolvedFrontendPath = candidateFrontendPaths.find((p) => fs.existsSync(p));

if (resolvedFrontendPath) {
  app.use(express.static(resolvedFrontendPath));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith(env.API_PREFIX)) {
      return next();
    }
    res.sendFile(path.join(resolvedFrontendPath, 'index.html'));
  });
}

// 404 handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist.`,
    },
  });
});

// Centralized error handler
app.use(errorHandler);
