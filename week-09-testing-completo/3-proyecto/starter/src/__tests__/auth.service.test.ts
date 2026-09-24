const mockFindUserByEmail = jest.fn();
const mockFindUserById = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateRefreshToken = jest.fn();
const mockHash = jest.fn();
const mockCompare = jest.fn();
const mockSignAccess = jest.fn();
const mockSignRefresh = jest.fn();
const mockVerifyRefresh = jest.fn();

jest.mock('../repositories/users.repository.js', () => ({
  findUserByEmail: (...a: unknown[]) => mockFindUserByEmail(...a),
  findUserById: (...a: unknown[]) => mockFindUserById(...a),
  createUser: (...a: unknown[]) => mockCreateUser(...a),
  updateRefreshToken: (...a: unknown[]) => mockUpdateRefreshToken(...a),
}));

jest.mock('bcrypt', () => ({
  hash: (...a: unknown[]) => mockHash(...a),
  compare: (...a: unknown[]) => mockCompare(...a),
}));

jest.mock('../utils/jwt.js', () => ({
  signAccessToken: (...a: unknown[]) => mockSignAccess(...a),
  signRefreshToken: (...a: unknown[]) => mockSignRefresh(...a),
  verifyRefreshToken: (...a: unknown[]) => mockVerifyRefresh(...a),
}));

import * as authService from '../services/auth.service.js';
import { AppError } from '../errors/AppError.js';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      mockFindUserByEmail.mockResolvedValue(null);
      mockHash.mockResolvedValue('hashed');
      mockCreateUser.mockResolvedValue({
        _id: 'id1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
      });

      const result = await authService.register({
        name: 'Test',
        email: 'test@test.com',
        password: 'Password1',
      });

      expect(result.email).toBe('test@test.com');
      expect(mockHash).toHaveBeenCalledWith('Password1', 12);
    });

    it('should throw 409 if email already exists', async () => {
      mockFindUserByEmail.mockResolvedValue({ email: 'test@test.com' });
      await expect(
        authService.register({ name: 'Test', email: 'test@test.com', password: 'Password1' })
      ).rejects.toMatchObject({ statusCode: 409 });
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      mockFindUserByEmail.mockResolvedValue({
        _id: { toString: () => 'id1' },
        email: 'test@test.com',
        password: 'hashed',
        role: 'user',
      });
      mockCompare.mockResolvedValue(true);
      mockSignAccess.mockReturnValue('access-token');
      mockSignRefresh.mockReturnValue('refresh-token');
      mockUpdateRefreshToken.mockResolvedValue(undefined);

      const result = await authService.login({ email: 'test@test.com', password: 'Password1' });
      expect(result.accessToken).toBe('access-token');
      expect(result.role).toBe('user');
    });

    it('should throw 401 with invalid email', async () => {
      mockFindUserByEmail.mockResolvedValue(null);
      await expect(
        authService.login({ email: 'bad@test.com', password: 'x' })
      ).rejects.toMatchObject({ statusCode: 401 });
    });

    it('should throw 401 with invalid password', async () => {
      mockFindUserByEmail.mockResolvedValue({
        _id: { toString: () => 'id1' },
        email: 'test@test.com',
        password: 'hashed',
        role: 'user',
      });
      mockCompare.mockResolvedValue(false);
      await expect(
        authService.login({ email: 'test@test.com', password: 'wrong' })
      ).rejects.toMatchObject({ statusCode: 401 });
    });
  });

  describe('getMe', () => {
    it('should return user profile', async () => {
      mockFindUserById.mockResolvedValue({
        _id: 'id1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
      });
      const result = await authService.getMe('id1');
      expect(result.email).toBe('test@test.com');
    });

    it('should throw 404 if user not found', async () => {
      mockFindUserById.mockResolvedValue(null);
      await expect(authService.getMe('missing')).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
