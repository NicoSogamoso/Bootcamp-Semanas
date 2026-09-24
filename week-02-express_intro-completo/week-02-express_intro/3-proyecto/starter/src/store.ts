import type { Member, CreateMemberDto, UpdateMemberDto } from './types.js';

let nextId = 4;
const members: Member[] = [
  { id: 1, fullName: 'Laura Gómez', membershipType: 'vip', monthlyFee: 150000, active: true, joinedAt: '2022-01-10' },
  { id: 2, fullName: 'Carlos Pérez', membershipType: 'regular', monthlyFee: 80000, active: true, joinedAt: '2023-03-15' },
  { id: 3, fullName: 'Diego Torres', membershipType: 'honorario', monthlyFee: 0, active: true, joinedAt: '2020-01-01' },
];

export function getAll(): Member[] {
  return [...members];
}

export function getById(id: number): Member | undefined {
  return members.find((m) => m.id === id);
}

export function create(data: CreateMemberDto): Member {
  const member: Member = { id: nextId++, ...data };
  members.push(member);
  return member;
}

export function update(id: number, data: UpdateMemberDto): Member | undefined {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  members[index] = { ...members[index], ...data };
  return members[index];
}

export function remove(id: number): boolean {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return false;
  members.splice(index, 1);
  return true;
}
