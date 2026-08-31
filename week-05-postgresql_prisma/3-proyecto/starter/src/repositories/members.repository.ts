// src/repositories/members.repository.ts — Acceso a datos con Prisma
// Club Social — Member
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';
import { CreateMemberDto, UpdateMemberDto } from '../schemas/member.schema';

interface FindAllResult {
  data: Prisma.MemberGetPayload<{ include: { plan: true } }>[];
  total: number;
  page: number;
  limit: number;
}

export async function findAll(page: number, limit: number): Promise<FindAllResult> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.member.findMany({
      skip,
      take: limit,
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.member.count(),
  ]);

  return { data, total, page, limit };
}

export async function findById(id: number) {
  return prisma.member.findUnique({
    where: { id },
    include: { plan: true },
  });
}

export async function create(data: CreateMemberDto) {
  try {
    return await prisma.member.create({
      data,
      include: { plan: true },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe un socio con ese email');
    }
    throw err;
  }
}

export async function update(id: number, data: UpdateMemberDto) {
  try {
    return await prisma.member.update({
      where: { id },
      data,
      include: { plan: true },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, 'Socio no encontrado');
      }
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe un socio con ese email');
      }
    }
    throw err;
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await prisma.member.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Socio no encontrado');
    }
    throw err;
  }
}