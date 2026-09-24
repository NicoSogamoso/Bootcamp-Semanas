import { z } from 'zod';

export const createMemberSchema = z.object({
  fullName: z.string().min(2).max(200).trim(),
  membershipType: z.enum(['regular', 'vip', 'honorario']),
  monthlyFee: z.number().min(0).max(10_000_000),
  joinedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'joinedAt must be YYYY-MM-DD'),
  active: z.boolean().optional().default(true),
});

export const updateMemberSchema = createMemberSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
