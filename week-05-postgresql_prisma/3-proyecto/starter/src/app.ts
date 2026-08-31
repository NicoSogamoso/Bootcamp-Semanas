// src/app.ts — Configuracion de la aplicacion Express
// Club Social

import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import membersRouter from './routes/members.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/members', membersRouter);

app.use(notFound);
app.use(errorHandler);

export { app };