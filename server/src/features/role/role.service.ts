import { UserWithRole } from '../../core/user/types/user.interface';
import { UserService, userService } from '../../core/user/user.service';
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
  ): Promise<UserWithRole> => {
    const user = await this.userService.findByClerkId(clerkId);

    if (!user) {
      throw new Error('User not found');
    }

    const role = await this.getRole(roleName);

    await this.userRoleModel.create({
      user: user.id,
      role: role.id,
    });

    return await this.userService.getUser(clerkId);
  };

  public getRoleByUser = async (clerkId: string): Promise<string | null> => {
    const user = await this.userService.findByClerkId(clerkId);

    if (!user) {
      throw new Error('User not found');
    }

    const userRole = await this.userRoleModel.findOne({ user: user.id });

    if (!userRole) {
      return null;
    }

    const role = await this.roleModel.findById(userRole.role);

    return role?.name ?? null;
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
