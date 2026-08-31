// src/routes/members.routes.ts — Definicion de rutas del recurso
// Club Social — Member
import { Router } from 'express';
import * as ctrl from '../controllers/members.controller';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;