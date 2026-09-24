import { Plan, IPlan } from '../models/plan.model.js';
import { AppError } from '../errors/AppError.js';
import { CreatePlanDto, UpdatePlanDto } from '../schemas/plan.schema.js';

function handleMongoError(err: unknown): never {
  if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
    throw new AppError(409, 'Ya existe un plan con ese nombre');
  }
  if (err && typeof err === 'object' && 'name' in err && (err as { name: string }).name === 'CastError') {
    throw new AppError(400, 'ID inválido');
  }
  throw err;
}

export async function findAll(): Promise<IPlan[]> {
  return Plan.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IPlan | null> {
  try {
    return await Plan.findById(id);
  } catch (err) {
    handleMongoError(err);
  }
}

export async function create(data: CreatePlanDto): Promise<IPlan> {
  try {
    return await Plan.create(data);
  } catch (err) {
    handleMongoError(err);
  }
}

export async function update(id: string, data: UpdatePlanDto): Promise<IPlan | null> {
  try {
    return await Plan.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    handleMongoError(err);
  }
}

export async function remove(id: string): Promise<IPlan | null> {
  try {
    return await Plan.findByIdAndDelete(id);
  } catch (err) {
    handleMongoError(err);
  }
}
