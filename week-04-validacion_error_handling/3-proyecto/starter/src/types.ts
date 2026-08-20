// ============================================
// TYPES — Club Social
// Recurso principal: Member (Socio)
// ============================================

export type MembershipType = "basica" | "premium" | "vip";

export interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: MembershipType;
  monthlyFee: number;
  active: boolean;
  joinedAt: Date;
}

// Tipos de respuesta genéricos — no necesitan cambio
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}