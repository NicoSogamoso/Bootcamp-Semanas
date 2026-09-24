import * as repo from '../repositories/members.repository.js';
import { AppError } from '../errors/AppError.js';
import type { CreateMemberDto, UpdateMemberDto, PaginatedResult, Member } from '../types.js';

export async function getAll(page = 1, limit = 10): Promise<PaginatedResult<Member>> {
  const all = await repo.findAll();
  const total = all.length;
  const data = all.slice((page - 1) * limit, (page - 1) * limit + limit);
  return { data, total, page, limit };
}

export async function getById(id: number): Promise<Member> {
  const member = await repo.findById(id);
  if (!member) throw new AppError(404, `Member ${id} not found`);
  return member;
}

export async function create(data: CreateMemberDto): Promise<Member> {
  return repo.create(data);
}

export async function update(id: number, data: UpdateMemberDto): Promise<Member> {
  const member = await repo.update(id, data);
  if (!member) throw new AppError(404, `Member ${id} not found`);
  return member;
}

export async function remove(id: number): Promise<void> {
  const ok = await repo.remove(id);
  if (!ok) throw new AppError(404, `Member ${id} not found`);
}
