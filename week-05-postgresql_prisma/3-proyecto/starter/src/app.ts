import express from 'express';
import membersRoutes from './routes/members.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/members', membersRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
