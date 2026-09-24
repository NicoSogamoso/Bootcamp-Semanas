import { Request, Response, NextFunction } from 'express';
import * as planService from '../services/plan.service.js';
import { createPlanSchema, updatePlanSchema } from '../schemas/plan.schema.js';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await planService.getAll();
    res.json({ data, total: data.length });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const data = await planService.getById(req.params.id);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = createPlanSchema.parse({ body: req.body });
    const data = await planService.create(body);
    res.status(201).json({ message: 'Plan created', data });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { body } = updatePlanSchema.parse({ body: req.body });
    const data = await planService.update(req.params.id, body);
    res.json({ message: 'Plan updated', data });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    await planService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
