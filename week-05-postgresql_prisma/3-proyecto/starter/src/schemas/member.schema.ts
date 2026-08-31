// src/schemas/member.schema.ts — Validación Zod para Member (Club Social)
import { z } from 'zod';

export const createMemberSchema = z.object({
  name: z.string().min(1, 'name no puede estar vacio').trim(),

  email: z
    .string()
    .min(1, 'email es obligatorio')
    .email('email no tiene un formato valido')
    .trim(),

  phone: z.string().trim().optional(),

  active: z.boolean().default(true),

  planId: z.number().int().positive('planId debe ser un numero entero positivo'),
});

// Schema de actualizacion definido de forma independiente (sin .default())
// para que un campo ausente en el body no sobrescriba el valor existente.
export const updateMemberSchema = z.object({
  name: z.string().min(1, 'name no puede estar vacio').trim().optional(),

  email: z
    .string()
    .min(1, 'email es obligatorio')
    .email('email no tiene un formato valido')
    .trim()
    .optional(),

  phone: z.string().trim().optional(),

  active: z.boolean().optional(),

  planId: z.number().int().positive('planId debe ser un numero entero positivo').optional(),
});

export type CreateMemberDto = z.infer<typeof createMemberSchema>;
export type UpdateMemberDto = z.infer<typeof updateMemberSchema>;