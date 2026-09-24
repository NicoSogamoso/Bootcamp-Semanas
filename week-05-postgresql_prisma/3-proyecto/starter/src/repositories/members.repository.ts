import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/AppError.js';
import type { CreateMemberInput, UpdateMemberInput } from '../schemas/members.schema.js';

function handlePrismaError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') throw new AppError(404, 'Recurso no encontrado');
    if (err.code === 'P2002') throw new AppError(409, 'Ya existe un registro con ese valor');
  }
  throw err;
}

export async function findAll(page: number, limit: number) {
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

export async function findById(id: string) {
  try {
    return await prisma.member.findUnique({ where: { id }, include: { plan: true } });
  } catch (err) {
    handlePrismaError(err);
  }
}

export async function create(data: CreateMemberInput) {
  try {
    return await prisma.member.create({
      data: {
        fullName: data.fullName,
        membershipType: data.membershipType,
        monthlyFee: data.monthlyFee,
        joinedAt: new Date(data.joinedAt),
        email: data.email,
        planId: data.planId,
        active: data.active ?? true,
      },
      include: { plan: true },
    });
  } catch (err) {
    handlePrismaError(err);
  }
}

export async function update(id: string, data: UpdateMemberInput) {
  try {
    const updateData: Prisma.MemberUpdateInput = {};
    if (data.fullName !== undefined) updateData.fullName = data.fullName;
    if (data.membershipType !== undefined) updateData.membershipType = data.membershipType;
    if (data.monthlyFee !== undefined) updateData.monthlyFee = data.monthlyFee;
    if (data.joinedAt !== undefined) updateData.joinedAt = new Date(data.joinedAt);
    if (data.email !== undefined) updateData.email = data.email;
    if (data.active !== undefined) updateData.active = data.active;
    if (data.planId !== undefined) updateData.plan = { connect: { id: data.planId } };

    return await prisma.member.update({
      where: { id },
      data: updateData,
      include: { plan: true },
    });
  } catch (err) {
    handlePrismaError(err);
  }
}

export async function remove(id: string) {
  try {
    await prisma.member.delete({ where: { id } });
  } catch (err) {
    handlePrismaError(err);
  }
}
