import { Router } from 'express';
import * as controller from '../controllers/members.controller';

export const membersRouter = Router();

membersRouter.get('/', controller.getAll);
membersRouter.get('/:id', controller.getById);
membersRouter.post('/', controller.create);
membersRouter.put('/:id', controller.update);
membersRouter.delete('/:id', controller.remove);