import { Request, Response, NextFunction } from 'express';
import * as service from '../services/members.service.js';
import { createMemberSchema, updateMemberSchema } from '../schemas/members.schema.js';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    res.json(await service.getAll(page, limit));
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ data: await service.getById(req.params.id as string) });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = createMemberSchema.parse(req.body);
    res.status(201).json({ data: await service.create(body) });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const body = updateMemberSchema.parse(req.body);
    res.json({ data: await service.update(req.params.id as string, body) });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
