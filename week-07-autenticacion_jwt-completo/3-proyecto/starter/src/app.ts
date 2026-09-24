import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import memberRoutes from './routes/member.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/members', memberRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
