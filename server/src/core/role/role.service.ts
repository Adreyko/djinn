import { UserService, userService } from './../user/user.service';
import { RoleModel } from './role.model';
import { UserRoleModel } from './user-role.model';

export class RoleService {
  constructor(
    private userRoleModel: typeof UserRoleModel,
    private roleModel: typeof RoleModel,
    private userService: UserService
  ) {}

  public getRoles = async (): Promise<string[]> => {
    const roles = await this.roleModel.find({});

    return roles.map((role) => role.name);
  };

  public getRole = async (role: string): Promise<any> => {
    const foundRole = await this.roleModel.findOne({ name: role });

    return foundRole ? foundRole : null;
  };

  public assignRole = async (
    clerkId: string,
    roleName: string
  ): Promise<string | null> => {
    const user = await this.userService.findByClerkId(clerkId);

    const role = await this.getRole(roleName);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRoleModel.create({
      user: user.id,
      role: role.id,
    });

    return role;
  };

  private createRoles = async () => {
    await this.roleModel.create({ name: 'employee' });
    await this.roleModel.create({ name: 'employer' });
  };
}

export const roleService = new RoleService(
  UserRoleModel,
  RoleModel,
  userService
);
