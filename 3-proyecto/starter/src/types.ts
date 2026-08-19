export type MembershipType = 'regular' | 'vip' | 'honorario';

export interface Member {
  id: number;
  fullName: string;
  membershipType: MembershipType;
  active: boolean;
  createdAt: string;
}

export type CreateMemberDto = Omit<Member, 'id' | 'createdAt'>;
export type UpdateMemberDto = Partial<CreateMemberDto>;

export interface SingleResponse<T> {
  data: T;
}
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
export interface ErrorResponse {
  error: string;
  message: string;
}
export interface PaginationParams {
  page: number;
  limit: number;
}