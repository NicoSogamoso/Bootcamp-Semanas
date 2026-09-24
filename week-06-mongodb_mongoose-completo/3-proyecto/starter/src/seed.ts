import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose.js';
import { Plan } from './models/plan.model.js';
import { Member } from './models/member.model.js';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/club-social-semana-06';

async function seed() {
  await connectDB(MONGODB_URI);

  await Member.deleteMany({});
  await Plan.deleteMany({});

  const [basic, premium, vip] = await Plan.insertMany([
    { name: 'Básico', description: 'Acceso a zonas comunes', monthlyPrice: 50000, benefits: ['Gym', 'Vestuarios'] },
    { name: 'Premium', description: 'Incluye clases grupales', monthlyPrice: 90000, benefits: ['Gym', 'Clases', 'Sauna'] },
    { name: 'VIP', description: 'Todo incluido + personal trainer', monthlyPrice: 150000, benefits: ['Gym', 'Clases', 'Sauna', 'PT'] },
  ]);

  await Member.insertMany([
    { fullName: 'Laura Gómez', membershipType: 'vip', monthlyFee: 150000, joinedAt: new Date('2022-01-10'), plan: vip._id, active: true },
    { fullName: 'Carlos Pérez', membershipType: 'regular', monthlyFee: 50000, joinedAt: new Date('2023-03-15'), plan: basic._id, active: true },
    { fullName: 'Ana Ruiz', membershipType: 'vip', monthlyFee: 90000, joinedAt: new Date('2023-06-01'), plan: premium._id, active: true },
    { fullName: 'Diego Torres', membershipType: 'honorario', monthlyFee: 0, joinedAt: new Date('2020-01-01'), plan: vip._id, active: true },
    { fullName: 'Sofía Vargas', membershipType: 'regular', monthlyFee: 50000, joinedAt: new Date('2024-02-20'), plan: basic._id, active: false },
  ]);

  console.log('Seed OK: 3 plans + 5 members');
  await disconnectDB();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
