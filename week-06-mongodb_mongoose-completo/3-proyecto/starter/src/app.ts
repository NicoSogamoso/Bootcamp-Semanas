import 'dotenv/config';
import express from 'express';
import planRoutes from './routes/plan.routes.js';
import memberRoutes from './routes/member.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

const app = express();
app.use(express.json());

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/plans', planRoutes);
app.use('/api/v1/members', memberRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
