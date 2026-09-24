import { Request, Response, NextFunction } from 'express';
import * as memberService from '../services/member.service.js';
import { createMemberSchema, updateMemberSchema } from '../schemas/member.schema.js';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const result = await memberService.getAll(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const data = await memberService.getById(req.params.id);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = createMemberSchema.parse({ body: req.body });
    const data = await memberService.create(body);
    res.status(201).json({ message: 'Member created', data });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { body } = updateMemberSchema.parse({ body: req.body });
    const data = await memberService.update(req.params.id, body);
    res.json({ message: 'Member updated', data });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    await memberService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
