import { Member, IMember } from '../models/member.model.js';
import { AppError } from '../errors/AppError.js';
import { CreateMemberDto, UpdateMemberDto } from '../schemas/member.schema.js';

function handleMongoError(err: unknown): never {
  if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
    throw new AppError(409, 'Ya existe un registro con ese valor único');
  }
  if (err && typeof err === 'object' && 'name' in err && (err as { name: string }).name === 'CastError') {
    throw new AppError(400, 'ID inválido');
  }
  throw err;
}

export async function findAll(page = 1, limit = 10): Promise<{ data: IMember[]; total: number; page: number; totalPages: number }> {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Member.find().populate('plan').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Member.countDocuments(),
  ]);
  return { data, total, page, totalPages: Math.ceil(total / limit) || 1 };
}

export async function findById(id: string): Promise<IMember | null> {
  try {
    return await Member.findById(id).populate('plan');
  } catch (err) {
    handleMongoError(err);
  }
}

export async function create(data: CreateMemberDto): Promise<IMember> {
  try {
    const joinedAt = typeof data.joinedAt === 'string' ? new Date(data.joinedAt) : data.joinedAt;
    const member = await Member.create({ ...data, joinedAt });
    return (await Member.findById(member._id).populate('plan')) as IMember;
  } catch (err) {
    handleMongoError(err);
  }
}

export async function update(id: string, data: UpdateMemberDto): Promise<IMember | null> {
  try {
    const updateData: Record<string, unknown> = { ...data };
    if (data.joinedAt !== undefined) {
      updateData.joinedAt = typeof data.joinedAt === 'string' ? new Date(data.joinedAt) : data.joinedAt;
    }
    return await Member.findByIdAndUpdate(id, updateData, { new: true }).populate('plan');
  } catch (err) {
    handleMongoError(err);
  }
}

export async function remove(id: string): Promise<IMember | null> {
  try {
    return await Member.findByIdAndDelete(id);
  } catch (err) {
    handleMongoError(err);
  }
}
