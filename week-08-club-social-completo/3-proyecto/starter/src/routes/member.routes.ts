import { Router } from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from '../controllers/member.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = Router();

// GET /api/v1/members — público (catálogo del club)
router.get('/', getAllMembers);

// GET /api/v1/members/:id — público
router.get('/:id', getMemberById);

// POST /api/v1/members — autenticado (cualquier usuario puede registrar un socio)
router.post('/', authMiddleware, createMember);

// PATCH /api/v1/members/:id — autenticado (dueño o admin; verificado en service)
router.patch('/:id', authMiddleware, updateMember);

// DELETE /api/v1/members/:id — solo admin
router.delete('/:id', authMiddleware, requireRole('admin'), deleteMember);

export default router;
