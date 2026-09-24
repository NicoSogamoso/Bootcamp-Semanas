import { Router, Request, Response, NextFunction } from 'express';
import * as store from '../store.js';
import type { CreateMemberDto, UpdateMemberDto } from '../types.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ data: store.getAll() });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const member = store.getById(id);
  if (!member) {
    res.status(404).json({ error: 'Not Found', message: `Member ${id} not found` });
    return;
  }
  res.json({ data: member });
});

router.post('/', (req: Request, res: Response) => {
  const body = req.body as CreateMemberDto;
  const member = store.create({
    fullName: body.fullName,
    membershipType: body.membershipType,
    monthlyFee: body.monthlyFee,
    active: body.active ?? true,
    joinedAt: body.joinedAt,
  });
  res.status(201).json({ data: member });
});

router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body as UpdateMemberDto;
  const member = store.update(id, body);
  if (!member) {
    res.status(404).json({ error: 'Not Found', message: `Member ${id} not found` });
    return;
  }
  res.json({ data: member });
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = store.remove(id);
  if (!ok) {
    res.status(404).json({ error: 'Not Found', message: `Member ${id} not found` });
    return;
  }
  res.status(204).send();
});

export default router;
