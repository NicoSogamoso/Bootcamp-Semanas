import * as planRepo from '../repositories/plan.repository.js';
import { AppError } from '../errors/AppError.js';
import { CreatePlanDto, UpdatePlanDto } from '../schemas/plan.schema.js';

export async function getAll() {
  return planRepo.findAll();
}

export async function getById(id: string) {
  const plan = await planRepo.findById(id);
  if (!plan) throw new AppError(404, 'Plan not found');
  return plan;
}

export async function create(data: CreatePlanDto) {
  return planRepo.create(data);
}

export async function update(id: string, data: UpdatePlanDto) {
  const plan = await planRepo.update(id, data);
  if (!plan) throw new AppError(404, 'Plan not found');
  return plan;
}

export async function remove(id: string) {
  const plan = await planRepo.remove(id);
  if (!plan) throw new AppError(404, 'Plan not found');
  return plan;
}
