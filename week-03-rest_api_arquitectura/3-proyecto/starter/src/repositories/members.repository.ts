// ============================================================
// members.repository.ts
// ÚNICA capa que conoce y toca el "store" (aquí: un array en
// memoria). Si mañana cambias a una base de datos real, SOLO
// este archivo debería cambiar; el resto de la app no se entera.
// ============================================================

import { Member, CreateMemberInput, UpdateMemberInput } from '../types';

// "Base de datos" en memoria. Se reinicia cada vez que reinicias el server.
const store: Member[] = [
  {
    id: 1,
    fullName: 'Laura Gómez',
    membershipType: 'vip',
    monthlyFee: 150000,
    active: true,
    joinedAt: '2022-01-10',
    createdAt: '2022-01-10T09:00:00.000Z',
  },
  {
    id: 2,
    fullName: 'Andrés Rojas',
    membershipType: 'regular',
    monthlyFee: 80000,
    active: true,
    joinedAt: '2023-05-20',
    createdAt: '2023-05-20T09:00:00.000Z',
  },
  {
    id: 3,
    fullName: 'Marcela Torres',
    membershipType: 'honorario',
    monthlyFee: 0,
    active: false,
    joinedAt: '2019-11-01',
    createdAt: '2019-11-01T09:00:00.000Z',
  },
];

// Contador simple para asignar el próximo id.
let nextId = store.length + 1;

// Copia defensiva: evita que quien reciba el objeto pueda mutar
// el original guardado en el "store".
function clone(member: Member): Member {
  return { ...member };
}

export const membersRepository = {
  // Devuelve TODOS los registros (la paginación se hace en el service).
  async findAll(): Promise<Member[]> {
    return store.map(clone);
  },

  // Busca uno por id. Devuelve undefined si no existe (el service
  // decide qué hacer con eso, no el repository).
  async findById(id: number): Promise<Member | undefined> {
    const found = store.find((m) => m.id === id);
    return found ? clone(found) : undefined;
  },

  // Crea un nuevo socio y lo guarda en el store.
  async create(input: CreateMemberInput): Promise<Member> {
    const newMember: Member = {
      id: nextId++,
      fullName: input.fullName,
      membershipType: input.membershipType,
      monthlyFee: input.monthlyFee,
      active: input.active ?? true,
      joinedAt: input.joinedAt,
      createdAt: new Date().toISOString(),
    };
    store.push(newMember);
    return clone(newMember);
  },

  // Actualiza un socio existente. Devuelve undefined si no existe.
  async update(id: number, input: UpdateMemberInput): Promise<Member | undefined> {
    const index = store.findIndex((m) => m.id === id);
    if (index === -1) return undefined;

    const updated: Member = {
      ...store[index],
      ...input, // solo pisa los campos que vengan en input
    };
    store[index] = updated;
    return clone(updated);
  },

  // Elimina un socio. Devuelve true si lo borró, false si no existía.
  async delete(id: number): Promise<boolean> {
    const index = store.findIndex((m) => m.id === id);
    if (index === -1) return false;

    store.splice(index, 1);
    return true;
  },
};
