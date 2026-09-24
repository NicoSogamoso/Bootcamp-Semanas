import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const membershipTypeEnum = z.enum(['regular', 'vip', 'honorario']);

export const createMemberSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).max(200),
    membershipType: membershipTypeEnum,
    monthlyFee: z.number().min(0).max(10_000_000),
    joinedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.coerce.date()),
    plan: z.string().regex(objectIdRegex, 'plan must be a valid ObjectId'),
    active: z.boolean().optional(),
  }),
});

export const updateMemberSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).max(200).optional(),
    membershipType: membershipTypeEnum.optional(),
    monthlyFee: z.number().min(0).max(10_000_000).optional(),
    joinedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.coerce.date()).optional(),
    plan: z.string().regex(objectIdRegex, 'plan must be a valid ObjectId').optional(),
    active: z.boolean().optional(),
  }),
});

export type CreateMemberDto = z.infer<typeof createMemberSchema>['body'];
export type UpdateMemberDto = z.infer<typeof updateMemberSchema>['body'];
