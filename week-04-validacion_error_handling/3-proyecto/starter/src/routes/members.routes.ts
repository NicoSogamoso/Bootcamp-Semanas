// ============================================
// ROUTES — registrar los 5 endpoints del recurso
// Club Social — Member
// ============================================
import { Router } from 'express';
import * as controller from '../controllers/members.controller';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;