// prisma/seed.ts — Datos iniciales del dominio
// Club Social — Plan + Member
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Iniciando seed...');

  // 1. Limpiar datos existentes (idempotencia)
  // Se eliminan primero los Member por la relación FK hacia Plan
  await prisma.member.deleteMany();
  await prisma.plan.deleteMany();

  // 2. Crear los planes (recurso secundario)
  const basica = await prisma.plan.create({
    data: { name: 'Básica', price: 40000, description: 'Acceso a instalaciones generales' },
  });
  const premium = await prisma.plan.create({
    data: { name: 'Premium', price: 80000, description: 'Incluye clases grupales' },
  });
  const vip = await prisma.plan.create({
    data: { name: 'VIP', price: 150000, description: 'Acceso total + entrenador personal' },
  });

  console.log('3 planes creados');

  // 3. Crear socios (recurso principal) — mínimo 5 registros
  const result = await prisma.member.createMany({
    data: [
      {
        name: 'Laura Gómez',
        email: 'laura.gomez@email.com',
        phone: '3001234567',
        active: true,
        planId: premium.id,
      },
      {
        name: 'Carlos Pérez',
        email: 'carlos.perez@email.com',
        phone: '3009876543',
        active: true,
        planId: basica.id,
      },
      {
        name: 'Mariana Ruiz',
        email: 'mariana.ruiz@email.com',
        active: false,
        planId: vip.id,
      },
      {
        name: 'Andrés López',
        email: 'andres.lopez@email.com',
        phone: '3012223344',
        active: true,
        planId: basica.id,
      },
      {
        name: 'Sofía Ramírez',
        email: 'sofia.ramirez@email.com',
        phone: '3045556677',
        active: true,
        planId: premium.id,
      },
    ],
  });

  console.log(`${result.count} socios creados`);
}

main()
  .catch((err: unknown) => {
    console.error('Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });