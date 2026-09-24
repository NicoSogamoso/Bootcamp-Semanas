import express, { Request, Response, NextFunction } from 'express';
import membersRoutes from './routes/members.routes.js';

const app = express();
app.use(express.json());

app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/members', membersRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Route not found' });
});

app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.statusCode ?? 500;
  res.status(status).json({
    error: status === 404 ? 'Not Found' : 'Error',
    message: err.message,
  });
});

export { app };
