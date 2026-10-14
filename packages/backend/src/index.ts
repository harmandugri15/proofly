import { startServer } from './server.js';
import { logger } from './lib/logger.js';

startServer().catch((error) => {
  logger.error('Fatal server startup failure', error);
  process.exit(1);
});
