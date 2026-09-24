import { z } from 'zod';

const membershipTypeEnum = z.enum(['regular', 'vip', 'honorario']);

export const createMemberSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(2, 'fullName must be at least 2 characters')
      .max(200)
      .regex(/^[^<>]*$/, 'fullName must not contain HTML characters'),
    membershipType: membershipTypeEnum,
    monthlyFee: z
      .number()
      .min(0, 'monthlyFee must be >= 0')
      .max(10_000_000, 'monthlyFee is too high'),
    joinedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'joinedAt must be YYYY-MM-DD')
      .or(z.coerce.date()),
    active: z.boolean().optional(),
  }),
});

export const updateMemberSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(2)
      .max(200)
      .regex(/^[^<>]*$/)
      .optional(),
    membershipType: membershipTypeEnum.optional(),
    monthlyFee: z.number().min(0).max(10_000_000).optional(),
    joinedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .or(z.coerce.date())
      .optional(),
    active: z.boolean().optional(),
  }),
});

export type CreateMemberDto = z.infer<typeof createMemberSchema>['body'];
export type UpdateMemberDto = z.infer<typeof updateMemberSchema>['body'];
