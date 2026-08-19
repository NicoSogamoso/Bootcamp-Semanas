import express, { Request, Response, NextFunction } from 'express';
import { membersRouter } from './routes/members.routes';
import { ValidationError } from './services/members.service';
import { ErrorResponse } from './types';

const app = express();
app.use(express.json());

app.use('/api/v1/members', membersRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((_req: Request, res: Response) => {
  const body: ErrorResponse = { error: 'Not Found', message: 'Route not found' };
  res.status(404).json(body);
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    const body: ErrorResponse = { error: 'Bad Request', message: err.message };
    res.status(400).json(body);
    return;
  }
  console.error(err);
  const body: ErrorResponse = { error: 'Internal Server Error', message: 'Something went wrong' };
  res.status(500).json(body);
});

export default app;