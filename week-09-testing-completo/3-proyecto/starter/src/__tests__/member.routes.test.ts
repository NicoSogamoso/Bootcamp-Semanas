import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt';
import { app } from '../app.js';
import { User } from '../models/user.model.js';
import { Member } from '../models/member.model.js';
import { signAccessToken } from '../utils/jwt.js';

process.env.JWT_ACCESS_SECRET = 'test_access_secret_for_jest_only_32chars';
process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_for_jest_only_32chars';
process.env.NODE_ENV = 'test';

let mongo: MongoMemoryServer;
let userToken: string;
let adminToken: string;
let userId: string;
let adminId: string;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());

  const userPass = await bcrypt.hash('User1234!', 10);
  const adminPass = await bcrypt.hash('Admin1234!', 10);

  const user = await User.create({
    name: 'Regular User',
    email: 'user@test.com',
    password: userPass,
    role: 'user',
  });
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@test.com',
    password: adminPass,
    role: 'admin',
  });

  userId = user._id.toString();
  adminId = admin._id.toString();

  userToken = signAccessToken({ sub: userId, email: user.email, role: 'user' });
  adminToken = signAccessToken({ sub: adminId, email: admin.email, role: 'admin' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await Member.deleteMany({});
});

describe('GET /api/v1/members', () => {
  it('should return 200 with empty array initially', async () => {
    const res = await request(app).get('/api/v1/members');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.total).toBe(0);
  });
});

describe('POST /api/v1/members', () => {
  const validBody = {
    fullName: 'Camila Ruiz',
    membershipType: 'regular',
    monthlyFee: 80000,
    joinedAt: '2026-08-19',
  };

  it('should return 201 with valid data and auth', async () => {
    const res = await request(app)
      .post('/api/v1/members')
      .set('Authorization', `Bearer ${userToken}`)
      .send(validBody);

    expect(res.status).toBe(201);
    expect(res.body.data.fullName).toBe('Camila Ruiz');
    expect(res.body.data.createdBy).toBe(userId);
  });

  it('should return 422 with invalid data', async () => {
    const res = await request(app)
      .post('/api/v1/members')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ fullName: 'A', membershipType: 'invalid', monthlyFee: -1 });

    expect(res.status).toBe(422);
  });

  it('should return 401 without token', async () => {
    const res = await request(app).post('/api/v1/members').send(validBody);
    expect(res.status).toBe(401);
  });
});

describe('GET /api/v1/members/:id', () => {
  it('should return 200 with existing member', async () => {
    const member = await Member.create({
      fullName: 'Test Member',
      membershipType: 'vip',
      monthlyFee: 100000,
      joinedAt: new Date('2024-01-01'),
      createdBy: userId,
    });

    const res = await request(app).get(`/api/v1/members/${member._id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.fullName).toBe('Test Member');
  });

  it('should return 404 with non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/v1/members/${fakeId}`);
    expect(res.status).toBe(404);
  });
});

describe('PATCH /api/v1/members/:id', () => {
  it('should return 200 when owner updates', async () => {
    const member = await Member.create({
      fullName: 'Owner Member',
      membershipType: 'regular',
      monthlyFee: 50000,
      joinedAt: new Date('2024-01-01'),
      createdBy: userId,
    });

    const res = await request(app)
      .patch(`/api/v1/members/${member._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ monthlyFee: 60000 });

    expect(res.status).toBe(200);
    expect(res.body.data.monthlyFee).toBe(60000);
  });
});

describe('DELETE /api/v1/members/:id', () => {
  it('should return 204 when admin deletes', async () => {
    const member = await Member.create({
      fullName: 'To Delete',
      membershipType: 'regular',
      monthlyFee: 50000,
      joinedAt: new Date('2024-01-01'),
      createdBy: userId,
    });

    const res = await request(app)
      .delete(`/api/v1/members/${member._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
  });

  it('should return 403 when non-admin tries to delete', async () => {
    const member = await Member.create({
      fullName: 'Protected',
      membershipType: 'regular',
      monthlyFee: 50000,
      joinedAt: new Date('2024-01-01'),
      createdBy: userId,
    });

    const res = await request(app)
      .delete(`/api/v1/members/${member._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});
