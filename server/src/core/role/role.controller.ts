import { RoleService, roleService } from './role.service';
import { Request, Response } from 'express';
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  public getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      const roles = await this.roleService.getRoles();

      res.status(200).json(roles);
    } catch (err) {
      const error = err as Error;

      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error fetching roles',
      });
    }
  };
}

export const roleController = new RoleController(roleService);
