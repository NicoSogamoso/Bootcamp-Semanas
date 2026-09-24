import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
    monthlyPrice: z.number().min(0),
    benefits: z.array(z.string()).optional(),
    active: z.boolean().optional(),
  }),
});

export const updatePlanSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    monthlyPrice: z.number().min(0).optional(),
    benefits: z.array(z.string()).optional(),
    active: z.boolean().optional(),
  }),
});

export type CreatePlanDto = z.infer<typeof createPlanSchema>['body'];
export type UpdatePlanDto = z.infer<typeof updatePlanSchema>['body'];
