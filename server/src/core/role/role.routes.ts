import { Router } from 'express';
import { roleController } from './role.controller';

const roleRouter = Router();

roleRouter.get('/', roleController.getRoles);

export default roleRouter;
