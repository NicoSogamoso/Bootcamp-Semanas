import * as memberRepo from '../repositories/member.repository.js';
import * as planRepo from '../repositories/plan.repository.js';
import { AppError } from '../errors/AppError.js';
import { CreateMemberDto, UpdateMemberDto } from '../schemas/member.schema.js';

export async function getAll(page = 1, limit = 10) {
  return memberRepo.findAll(page, limit);
}

export async function getById(id: string) {
  const member = await memberRepo.findById(id);
  if (!member) throw new AppError(404, 'Member not found');
  return member;
}

export async function create(data: CreateMemberDto) {
  const plan = await planRepo.findById(data.plan);
  if (!plan) throw new AppError(400, 'Plan no existe');
  return memberRepo.create(data);
}

export async function update(id: string, data: UpdateMemberDto) {
  if (data.plan) {
    const plan = await planRepo.findById(data.plan);
    if (!plan) throw new AppError(400, 'Plan no existe');
  }
  const member = await memberRepo.update(id, data);
  if (!member) throw new AppError(404, 'Member not found');
  return member;
}

export async function remove(id: string) {
  const member = await memberRepo.remove(id);
  if (!member) throw new AppError(404, 'Member not found');
  return member;
}
