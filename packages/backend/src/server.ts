import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { checkDatabaseConnection } from './lib/prisma.js';

export async function startServer() {
  const isDbHealthy = await checkDatabaseConnection();
  if (!isDbHealthy) {
    logger.warn('⚠️ Database connection check failed on startup. Will continue in degraded mode.');
  } else {
    logger.info(' Connected to database successfully.');
  }

  const server = app.listen(env.PORT, env.HOST, () => {
    logger.info(`🚀 Proofly Backend API running at http://${env.HOST}:${env.PORT}${env.API_PREFIX}`);
    logger.info(`💓 Health probe available at http://${env.HOST}:${env.PORT}${env.API_PREFIX}/health`);
  });

  return server;
}
