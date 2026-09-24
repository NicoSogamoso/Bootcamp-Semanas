// ============================================
// TIPOS — Club Social / Members
// ============================================

export type MembershipType = 'regular' | 'vip' | 'honorario';

export interface Member {
  id: string;
  fullName: string;
  membershipType: MembershipType;
  monthlyFee: number;
  active: boolean;
  joinedYear: number;
}

export interface MemberSummary {
  total: number;
  active: number;
  inactive: number;
  averageFee: number;
  mostExpensive: Member;
  cheapest: Member;
  categories: string[]; // membership types únicos
}

export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: MemberSummary;
  items: Member[];
}
