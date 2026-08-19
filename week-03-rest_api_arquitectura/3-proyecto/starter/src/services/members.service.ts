import { CreateMemberDto, UpdateMemberDto, Member, PaginatedResponse, PaginationParams } from '../types';
import * as repo from '../repositories/members.repository';

export class ValidationError extends Error {}

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Member>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Member | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreateMemberDto): Promise<Member> {
  if (!dto.fullName || dto.fullName.trim().length === 0) {
    throw new ValidationError('fullName is required');
  }
  const validTypes = ['regular', 'vip', 'honorario'];
  if (!validTypes.includes(dto.membershipType)) {
    throw new ValidationError(`membershipType must be one of: ${validTypes.join(', ')}`);
  }
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateMemberDto): Promise<Member | undefined> {
  if (dto.fullName !== undefined && dto.fullName.trim().length === 0) {
    throw new ValidationError('fullName cannot be empty');
  }
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}