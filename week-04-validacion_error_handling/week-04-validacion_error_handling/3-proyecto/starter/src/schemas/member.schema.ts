// ============================================
// SCHEMAS — Club Social (Member)
// ============================================
import { z } from 'zod';

export const createMemberSchema = z.object({
  name: z.string().min(1, 'name no puede estar vacío').trim(),

  email: z
    .string()
    .min(1, 'email es obligatorio')
    .email('email no tiene un formato válido')
    .trim(),

  membershipType: z.enum(['basica', 'premium', 'vip'], {
    message: 'membershipType debe ser: basica, premium o vip',
  }),

  monthlyFee: z.number().positive('monthlyFee debe ser mayor a 0'),

  active: z.boolean().default(true),

  joinedAt: z.coerce.date().default(() => new Date()),
});

// Reutiliza createMemberSchema con .partial() para actualizaciones parciales
export const updateMemberSchema = createMemberSchema.partial();

// Tipos inferidos desde los schemas (single source of truth)
export type CreateMemberDto = z.infer<typeof createMemberSchema>;
export type UpdateMemberDto = z.infer<typeof updateMemberSchema>;