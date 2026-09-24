import 'dotenv/config';
import { app } from './app.js';
import { logger } from './config/logger.js';

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  logger.info(`Club Social API (Prisma) → http://localhost:${PORT}`);
});
