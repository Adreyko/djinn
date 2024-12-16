import { Request, Response } from 'express';
import { userService, UserService } from './user.service';
import { AuthRequest } from '../../middlewares/validateClerk';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createOrUpdateUser(req.body);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      const error = err as Error;

      res.status(400).json({
        success: false,
        message: error.message || 'Error creating user',
      });
    }
  };

  public getUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.auth?.sub;

      const user = await this.userService.getUser(userId ?? '');

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      const error = err as Error;

      res.status(500).json({
        message: error.message || 'Error retrieving user',
      });
    }
  };
}

export const userController = new UserController(userService);
