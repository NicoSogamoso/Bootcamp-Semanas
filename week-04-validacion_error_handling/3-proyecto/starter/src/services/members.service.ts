// ============================================
// SERVICE — lógica de negocio
// Club Social — Member
// ============================================
import { Member, PaginatedResponse } from '../types';
import * as repo from '../repositories/members.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Member>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Member> {
  const member = await repo.findById(id);
  if (!member) throw new AppError(404, `Socio con id ${id} no encontrado`);
  return member;
}

export async function create(dto: repo.CreateMemberRepoDto): Promise<Member> {
  const all = await repo.findAll();
  const emailExists = all.some((m) => m.email === dto.email);
  if (emailExists) {
    throw new AppError(409, `Ya existe un socio con el email ${dto.email}`);
  }
  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateMemberRepoDto): Promise<Member> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Socio con id ${id} no encontrado`);

  if (dto.email) {
    const all = await repo.findAll();
    const emailTaken = all.some((m) => m.email === dto.email && m.id !== id);
    if (emailTaken) {
      throw new AppError(409, `Ya existe un socio con el email ${dto.email}`);
    }
  }

  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Socio con id ${id} no encontrado`);
  await repo.remove(id);
}