import { Request, Response, NextFunction } from 'express';
import * as service from '../services/members.service.js';
import { createMemberSchema, updateMemberSchema, idParamSchema } from '../schemas/member.schema.js';

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
    const { id } = idParamSchema.parse(req.params);
    res.json({ data: await service.getById(id) });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = createMemberSchema.parse(req.body);
    const data = await service.create(body);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = idParamSchema.parse(req.params);
    const body = updateMemberSchema.parse(req.body);
    res.json({ data: await service.update(id, body) });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = idParamSchema.parse(req.params);
    await service.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
