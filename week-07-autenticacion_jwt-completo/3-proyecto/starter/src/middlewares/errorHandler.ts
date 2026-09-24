import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { ZodError } from 'zod';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(422).json({
      error: 'Validation failed',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}
