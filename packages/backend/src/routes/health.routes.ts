import { Router } from 'express';
import { checkDatabaseConnection } from '../lib/prisma.js';

export const healthRouter = Router();

healthRouter.get('/', async (req, res) => {
  const isDbConnected = await checkDatabaseConnection();

  const healthData = {
    status: isDbConnected ? 'healthy' : 'degraded',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    services: {
      database: isDbConnected ? 'connected' : 'disconnected',
    },
  };

  return res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    data: healthData,
  });
});
