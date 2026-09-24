import * as repo from '../repositories/members.repository.js';
import type { CreateMemberDto, UpdateMemberDto, PaginatedResult, Member } from '../types.js';

export async function getAll(page = 1, limit = 10): Promise<PaginatedResult<Member>> {
  const all = await repo.findAll();
  const total = all.length;
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total, page, limit };
}

export async function getById(id: number): Promise<Member> {
  const member = await repo.findById(id);
  if (!member) {
    const err = new Error(`Member ${id} not found`) as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }
  return member;
}

export async function create(data: CreateMemberDto): Promise<Member> {
  return repo.create({
    ...data,
    active: data.active ?? true,
  });
}

export async function update(id: number, data: UpdateMemberDto): Promise<Member> {
  const member = await repo.update(id, data);
  if (!member) {
    const err = new Error(`Member ${id} not found`) as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }
  return member;
}

export async function remove(id: number): Promise<void> {
  const ok = await repo.remove(id);
  if (!ok) {
    const err = new Error(`Member ${id} not found`) as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }
}
