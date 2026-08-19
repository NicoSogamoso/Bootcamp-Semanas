import { Request, Response, NextFunction } from 'express';
import * as service from '../services/members.service';
import { CreateMemberDto, UpdateMemberDto, ErrorResponse } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const member = await service.findById(id);
    if (!member) {
      const body: ErrorResponse = { error: 'Not Found', message: `Member ${id} not found` };
      res.status(404).json(body);
      return;
    }
    res.json({ data: member });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateMemberDto;
    const member = await service.create(dto);
    res.status(201).json({ data: member });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const dto = req.body as UpdateMemberDto;
    const updated = await service.update(id, dto);
    if (!updated) {
      const body: ErrorResponse = { error: 'Not Found', message: `Member ${id} not found` };
      res.status(404).json(body);
      return;
    }
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) {
      const body: ErrorResponse = { error: 'Not Found', message: `Member ${id} not found` };
      res.status(404).json(body);
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}