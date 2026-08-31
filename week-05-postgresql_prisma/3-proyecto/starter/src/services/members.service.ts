// src/services/members.service.ts — Logica de negocio
// Club Social — Member
import * as repo from '../repositories/members.repository';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';
import { CreateMemberDto, UpdateMemberDto } from '../schemas/member.schema';

export async function listMembers(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getMember(id: number) {
  const member = await repo.findById(id);
  if (!member) {
    throw new AppError(404, 'Socio no encontrado');
  }
  return member;
}

export async function createMember(data: CreateMemberDto) {
  const plan = await prisma.plan.findUnique({ where: { id: data.planId } });
  if (!plan) {
    throw new AppError(404, `El plan con id ${data.planId} no existe`);
  }
  return repo.create(data);
}

export async function updateMember(id: number, data: UpdateMemberDto) {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, 'Socio no encontrado');
  }

  if (data.planId !== undefined) {
    const plan = await prisma.plan.findUnique({ where: { id: data.planId } });
    if (!plan) {
      throw new AppError(404, `El plan con id ${data.planId} no existe`);
    }
  }

  return repo.update(id, data);
}

export async function deleteMember(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, 'Socio no encontrado');
  }
  await repo.remove(id);
}