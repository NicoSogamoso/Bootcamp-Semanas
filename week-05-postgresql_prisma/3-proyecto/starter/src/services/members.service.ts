import * as repo from '../repositories/members.repository.js';
import { AppError } from '../errors/AppError.js';
import type { CreateMemberInput, UpdateMemberInput } from '../schemas/members.schema.js';

export async function getAll(page = 1, limit = 10) {
  return repo.findAll(page, limit);
}

export async function getById(id: string) {
  const member = await repo.findById(id);
  if (!member) throw new AppError(404, 'Recurso no encontrado');
  return member;
}

export async function create(data: CreateMemberInput) {
  return repo.create(data);
}

export async function update(id: string, data: UpdateMemberInput) {
  return repo.update(id, data);
}

export async function remove(id: string) {
  await repo.remove(id);
}
