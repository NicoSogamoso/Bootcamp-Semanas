import type { Member, CreateMemberDto, UpdateMemberDto } from '../types.js';

let nextId = 4;
const store: Member[] = [
  { id: 1, fullName: 'Laura Gómez', membershipType: 'vip', monthlyFee: 150000, active: true, joinedAt: '2022-01-10', createdAt: '2022-01-10T09:00:00.000Z' },
  { id: 2, fullName: 'Carlos Pérez', membershipType: 'regular', monthlyFee: 80000, active: true, joinedAt: '2023-03-15', createdAt: '2023-03-15T10:00:00.000Z' },
  { id: 3, fullName: 'Diego Torres', membershipType: 'honorario', monthlyFee: 0, active: true, joinedAt: '2020-01-01', createdAt: '2020-01-01T08:00:00.000Z' },
];

export async function findAll(): Promise<Member[]> {
  return store.map((m) => ({ ...m }));
}

export async function findById(id: number): Promise<Member | undefined> {
  const m = store.find((x) => x.id === id);
  return m ? { ...m } : undefined;
}

export async function create(data: CreateMemberDto): Promise<Member> {
  const member: Member = { id: nextId++, ...data, createdAt: new Date().toISOString() };
  store.push(member);
  return { ...member };
}

export async function update(id: number, data: UpdateMemberDto): Promise<Member | undefined> {
  const index = store.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index], ...data };
  return { ...store[index] };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((m) => m.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
