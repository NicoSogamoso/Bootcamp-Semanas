import { z } from 'zod';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const createMemberSchema = z.object({
  fullName: z.string().min(2).max(200).trim(),
  membershipType: z.enum(['regular', 'vip', 'honorario']),
  monthlyFee: z.number().int().min(0),
  joinedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().email().optional(),
  planId: z.string().regex(uuidRegex, 'planId must be a valid UUID'),
  active: z.boolean().optional(),
});

export const updateMemberSchema = createMemberSchema.partial();

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
