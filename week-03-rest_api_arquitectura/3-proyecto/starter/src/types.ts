export type MembershipType = 'regular' | 'vip' | 'honorario';

export interface Member {
  id: number;
  fullName: string;
  membershipType: MembershipType;
  monthlyFee: number;
  active: boolean;
  joinedAt: string;
  createdAt: string;
}

export type CreateMemberDto = Omit<Member, 'id' | 'createdAt'>;
export type UpdateMemberDto = Partial<CreateMemberDto>;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
