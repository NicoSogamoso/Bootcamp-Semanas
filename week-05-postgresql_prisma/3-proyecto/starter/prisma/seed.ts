import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Idempotent: delete members first (FK), then plans
  await prisma.member.deleteMany();
  await prisma.plan.deleteMany();

  const basic = await prisma.plan.create({
    data: { name: 'Básico', description: 'Acceso zonas comunes', monthlyPrice: 50000, benefits: ['Gym', 'Vestuarios'] },
  });
  const premium = await prisma.plan.create({
    data: { name: 'Premium', description: 'Incluye clases', monthlyPrice: 90000, benefits: ['Gym', 'Clases', 'Sauna'] },
  });
  const vip = await prisma.plan.create({
    data: { name: 'VIP', description: 'Todo + personal trainer', monthlyPrice: 150000, benefits: ['Gym', 'Clases', 'Sauna', 'PT'] },
  });

  await prisma.member.createMany({
    data: [
      { fullName: 'Laura Gómez', membershipType: 'vip', monthlyFee: 150000, joinedAt: new Date('2022-01-10'), email: 'laura@club.com', planId: vip.id },
      { fullName: 'Carlos Pérez', membershipType: 'regular', monthlyFee: 50000, joinedAt: new Date('2023-03-15'), email: 'carlos@club.com', planId: basic.id },
      { fullName: 'Ana Ruiz', membershipType: 'vip', monthlyFee: 90000, joinedAt: new Date('2023-06-01'), email: 'ana@club.com', planId: premium.id },
      { fullName: 'Diego Torres', membershipType: 'honorario', monthlyFee: 0, joinedAt: new Date('2020-01-01'), email: 'diego@club.com', planId: vip.id },
      { fullName: 'Sofía Vargas', membershipType: 'regular', monthlyFee: 50000, joinedAt: new Date('2024-02-20'), email: 'sofia@club.com', planId: basic.id, active: false },
    ],
  });

  console.log('Seed OK: 3 plans + 5 members');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
