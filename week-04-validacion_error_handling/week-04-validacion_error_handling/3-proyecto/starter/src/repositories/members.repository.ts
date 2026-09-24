// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// Club Social — Member
// ============================================
import { Member } from '../types';

export type CreateMemberRepoDto = Omit<Member, 'id'>;
export type UpdateMemberRepoDto = Partial<CreateMemberRepoDto>;

let members: Member[] = [
  {
    id: 1,
    name: 'Laura Gómez',
    email: 'laura.gomez@email.com',
    membershipType: 'premium',
    monthlyFee: 80000,
    active: true,
    joinedAt: new Date('2024-02-10'),
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    membershipType: 'basica',
    monthlyFee: 40000,
    active: true,
    joinedAt: new Date('2024-05-22'),
  },
  {
    id: 3,
    name: 'Mariana Ruiz',
    email: 'mariana.ruiz@email.com',
    membershipType: 'vip',
    monthlyFee: 150000,
    active: false,
    joinedAt: new Date('2023-11-01'),
  },
];

let nextId = 4;

export async function findAll(): Promise<Member[]> {
  return [...members];
}

export async function findById(id: number): Promise<Member | undefined> {
  const member = members.find((m) => m.id === id);
  return member ? { ...member } : undefined;
}

export async function create(dto: CreateMemberRepoDto): Promise<Member> {
  const member: Member = { id: nextId++, ...dto };
  members.push(member);
  return { ...member };
}

export async function update(id: number, dto: UpdateMemberRepoDto): Promise<Member | undefined> {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  members[index] = { ...members[index]!, ...dto };
  return { ...members[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return false;
  members.splice(index, 1);
  return true;
}