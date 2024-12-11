import { Router } from 'express';
import { roleController } from './role.controller';
import { validateRequest } from '../../middlewares/validator';
import { RoleDtoSchema } from '@djinn/models';

const roleRouter = Router();

roleRouter.get('/', roleController.getRoles);

roleRouter.post(
  '/assign-role',
  validateRequest(RoleDtoSchema),
  roleController.assignRole
);

export default roleRouter;
