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

const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps or curl) or in allowed list
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
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

// 404 handler
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
