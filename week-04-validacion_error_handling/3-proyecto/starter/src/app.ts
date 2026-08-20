// ============================================
// APP — configuración de Express
// Club Social — Member
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger';
import membersRouter from './routes/members.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// 1. Middlewares generales
app.use(express.json());
app.use(morganMiddleware);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// 2. Rutas del dominio
app.use('/api/v1/members', membersRouter);

// 3. notFound DESPUÉS de todas las rutas
app.use(notFound);

// 4. errorHandler como ÚLTIMO middleware
app.use(errorHandler);

export default app;