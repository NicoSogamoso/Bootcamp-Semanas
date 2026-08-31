// src/controllers/members.controller.ts — Capa HTTP
// Club Social — Member
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/members.service';
import { createMemberSchema, updateMemberSchema } from '../schemas/member.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query['limit']) || 10));

    const result = await service.listMembers(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ status: 'error', message: 'El id debe ser un numero entero positivo' });
      return;
    }

    const member = await service.getMember(id);
    res.json({ data: member });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = createMemberSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Datos de entrada invalidos',
        issues: result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
      });
      return;
    }

    const member = await service.createMember(result.data);
    res.status(201).json({ data: member });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ status: 'error', message: 'El id debe ser un numero entero positivo' });
      return;
    }

    const result = updateMemberSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Datos de entrada invalidos',
        issues: result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
      });
      return;
    }

    const member = await service.updateMember(id, result.data);
    res.json({ data: member });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ status: 'error', message: 'El id debe ser un numero entero positivo' });
      return;
    }

    await service.deleteMember(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}