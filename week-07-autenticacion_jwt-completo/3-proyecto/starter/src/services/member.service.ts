import { Member, IMember } from '../models/member.model.js';
import { CreateMemberDto, UpdateMemberDto } from '../schemas/member.schema.js';
import { AppError } from '../errors/AppError.js';

export async function findAll(): Promise<IMember[]> {
  return Member.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IMember | null> {
  return Member.findById(id);
}

export async function create(data: CreateMemberDto, userId: string): Promise<IMember> {
  const joinedAt =
    typeof data.joinedAt === 'string' ? new Date(data.joinedAt) : data.joinedAt;

  return Member.create({
    fullName: data.fullName,
    membershipType: data.membershipType,
    monthlyFee: data.monthlyFee,
    joinedAt,
    active: data.active ?? true,
    createdBy: userId,
  });
}

export async function update(id: string, data: UpdateMemberDto): Promise<IMember | null> {
  const updateData: Record<string, unknown> = { ...data };
  if (data.joinedAt !== undefined) {
    updateData.joinedAt =
      typeof data.joinedAt === 'string' ? new Date(data.joinedAt) : data.joinedAt;
  }
  return Member.findByIdAndUpdate(id, updateData, { new: true });
}

export async function remove(id: string): Promise<IMember | null> {
  return Member.findByIdAndDelete(id);
}
