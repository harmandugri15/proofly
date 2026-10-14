import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { prisma, checkDatabaseConnection } from './lib/prisma.js';
import { execSync } from 'child_process';

async function ensureDatabaseSchema() {
  try {
    await prisma.user.findFirst();
  } catch (error: any) {
    if (error?.message?.includes('does not exist') || error?.code === 'P2021') {
      logger.warn('⚠️ Database tables not found. Automatically executing schema sync...');
      try {
        execSync('npx prisma db push --skip-generate', {
          stdio: 'inherit',
          env: process.env,
        });
        logger.info('✅ Database tables synchronized successfully.');
      } catch (pushErr: any) {
        logger.error('Failed to auto-sync database schema:', pushErr?.message);
      }
    }
  }
}

export async function startServer() {
  const isDbHealthy = await checkDatabaseConnection();
  if (!isDbHealthy) {
    logger.warn('⚠️ Database connection check failed on startup. Will continue in degraded mode.');
  } else {
    logger.info(' Connected to database successfully.');
  }

  await ensureDatabaseSchema();

  const server = app.listen(env.PORT, env.HOST, () => {
    logger.info(`🚀 Proofly Backend API running at http://${env.HOST}:${env.PORT}${env.API_PREFIX}`);
    logger.info(`💓 Health probe available at http://${env.HOST}:${env.PORT}${env.API_PREFIX}/health`);
  });

  return server;
}
