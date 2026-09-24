import { Router } from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from '../controllers/member.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas del recurso requieren autenticación (Semana 07)
router.use(authMiddleware);

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.patch('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
