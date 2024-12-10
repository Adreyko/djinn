import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/', userController.createOrUpdateUser as any);

export default userRouter;
