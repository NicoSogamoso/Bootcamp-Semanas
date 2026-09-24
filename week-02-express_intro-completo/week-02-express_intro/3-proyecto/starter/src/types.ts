export type MembershipType = 'regular' | 'vip' | 'honorario';

export interface Member {
  id: number;
  fullName: string;
  membershipType: MembershipType;
  monthlyFee: number;
  active: boolean;
  joinedAt: string;
}

export type CreateMemberDto = Omit<Member, 'id'>;
export type UpdateMemberDto = Partial<CreateMemberDto>;
