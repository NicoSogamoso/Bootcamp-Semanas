import { Request, Response, NextFunction } from 'express';
import * as service from '../services/members.service.js';
import type { CreateMemberDto, UpdateMemberDto } from '../types.js';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const result = await service.getAll(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await service.getById(id);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as CreateMemberDto;
    const data = await service.create(body);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const body = req.body as UpdateMemberDto;
    const data = await service.update(id, body);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await service.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
