import { AppError } from '../errors/AppError.js';

const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockCreate = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.mock('../models/member.model.js', () => ({
  Member: {
    find: (...args: unknown[]) => ({ sort: () => mockFind(...args) }),
    findById: (...args: unknown[]) => mockFindById(...args),
    create: (...args: unknown[]) => mockCreate(...args),
    findByIdAndUpdate: (...args: unknown[]) => mockFindByIdAndUpdate(...args),
    findByIdAndDelete: (...args: unknown[]) => mockFindByIdAndDelete(...args),
  },
}));

import * as memberService from '../services/member.service.js';

const sampleMember = {
  _id: '507f1f77bcf86cd799439011',
  fullName: 'Laura Gómez',
  membershipType: 'vip',
  monthlyFee: 150000,
  active: true,
  joinedAt: new Date('2022-01-10'),
  createdBy: 'user-1',
};

describe('MemberService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all members', async () => {
      mockFind.mockResolvedValue([sampleMember]);
      const result = await memberService.findAll();
      expect(result).toEqual([sampleMember]);
      expect(mockFind).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return member by id', async () => {
      mockFindById.mockResolvedValue(sampleMember);
      const result = await memberService.findById(sampleMember._id);
      expect(result).toEqual(sampleMember);
    });

    it('should return null if not found', async () => {
      mockFindById.mockResolvedValue(null);
      const result = await memberService.findById('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a member with valid data', async () => {
      mockCreate.mockResolvedValue(sampleMember);
      const dto = {
        fullName: 'Laura Gómez',
        membershipType: 'vip' as const,
        monthlyFee: 150000,
        joinedAt: '2022-01-10',
      };
      const result = await memberService.create(dto, 'user-1');
      expect(result).toEqual(sampleMember);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          fullName: 'Laura Gómez',
          membershipType: 'vip',
          monthlyFee: 150000,
          createdBy: 'user-1',
        })
      );
    });
  });

  describe('update', () => {
    it('should update member when requester is owner', async () => {
      mockFindById.mockResolvedValue({ ...sampleMember, createdBy: 'user-1' });
      mockFindByIdAndUpdate.mockResolvedValue({ ...sampleMember, monthlyFee: 200000 });
      const result = await memberService.update(
        sampleMember._id,
        { monthlyFee: 200000 },
        'user-1',
        'user'
      );
      expect(result?.monthlyFee).toBe(200000);
    });

    it('should update member when requester is admin', async () => {
      mockFindById.mockResolvedValue({ ...sampleMember, createdBy: 'other-user' });
      mockFindByIdAndUpdate.mockResolvedValue({ ...sampleMember, monthlyFee: 200000 });
      const result = await memberService.update(
        sampleMember._id,
        { monthlyFee: 200000 },
        'admin-1',
        'admin'
      );
      expect(result?.monthlyFee).toBe(200000);
    });

    it('should throw 403 if not owner and not admin', async () => {
      mockFindById.mockResolvedValue({ ...sampleMember, createdBy: 'owner-id' });
      await expect(
        memberService.update(sampleMember._id, { monthlyFee: 1 }, 'other-user', 'user')
      ).rejects.toMatchObject({ statusCode: 403 });
    });

    it('should return null if member does not exist', async () => {
      mockFindById.mockResolvedValue(null);
      const result = await memberService.update('missing', { monthlyFee: 1 }, 'user-1', 'admin');
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete member', async () => {
      mockFindByIdAndDelete.mockResolvedValue(sampleMember);
      const result = await memberService.remove(sampleMember._id);
      expect(result).toEqual(sampleMember);
    });

    it('should return null if not found', async () => {
      mockFindByIdAndDelete.mockResolvedValue(null);
      const result = await memberService.remove('missing');
      expect(result).toBeNull();
    });
  });
});
