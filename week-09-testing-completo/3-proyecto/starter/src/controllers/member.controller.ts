import { Request, Response, NextFunction } from 'express';
import * as memberService from '../services/member.service.js';
import { createMemberSchema, updateMemberSchema } from '../schemas/member.schema.js';
import { AppError } from '../errors/AppError.js';
import { ZodError } from 'zod';

function handleZod(err: unknown, next: NextFunction): boolean {
  if (err instanceof ZodError) {
    next(
      new AppError(
        422,
        err.issues.map((i) => i.message).join('; ')
      )
    );
    return true;
  }
  return false;
}

export async function getAllMembers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const members = await memberService.findAll();
    res.json({ data: members, total: members.length });
  } catch (err) {
    next(err);
  }
}

export async function getMemberById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const member = await memberService.findById(req.params.id);
    if (!member) throw new AppError(404, 'Member not found');
    res.json({ data: member });
  } catch (err) {
    next(err);
  }
}

export async function createMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'Not authenticated');

    const { body } = createMemberSchema.parse({ body: req.body });
    const member = await memberService.create(body, req.user.sub);
    res.status(201).json({ message: 'Member created', data: member });
  } catch (err) {
    if (handleZod(err, next)) return;
    next(err);
  }
}

export async function updateMember(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'Not authenticated');

    const { body } = updateMemberSchema.parse({ body: req.body });
    const member = await memberService.update(
      req.params.id,
      body,
      req.user.sub,
      req.user.role as string
    );

    if (!member) throw new AppError(404, 'Member not found');
    res.json({ message: 'Member updated', data: member });
  } catch (err) {
    if (handleZod(err, next)) return;
    next(err);
  }
}

export async function deleteMember(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const member = await memberService.remove(req.params.id);
    if (!member) throw new AppError(404, 'Member not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
