import { RoleModel } from '../../features/role/role.model';
import { UserRoleModel } from '../../features/role/user-role.model';
import { UserCreate, IUser, UserWithRole } from './types/user.interface';
import { UserModel } from './user.model';

export class UserService {
  constructor(
    private userModel: typeof UserModel,
    private userRoleModel: typeof UserRoleModel,
    private roleModel: typeof RoleModel
  ) {}

  async create(data: UserCreate): Promise<IUser> {
    const created = (await this.userModel.create(data)).save();
    return created;
  }

  async update(id: string, data: UserCreate): Promise<IUser | null> {
    const updated = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updated ? updated.save() : null;
  }

  async findByClerkId(clerkId: string): Promise<IUser | null> {
    return this.userModel.findOne({ clerkId });
  }

  public createOrUpdateUser = async (
    data: UserCreate & { clerkId: string }
  ): Promise<IUser | null> => {
    const { clerkId, ...userData } = data;

    if (!clerkId) {
      throw new Error('clerkId is required');
    }

    const existingUser = await this.findByClerkId(clerkId);

    const user = existingUser
      ? await this.update(existingUser.id, { clerkId, ...userData })
      : await this.create({ clerkId, ...userData });

    return user;
  };

  getUser = async (id: string): Promise<UserWithRole> => {
    const user = await this.userModel.findOne({ clerkId: id });

    if (!user) {
      throw new Error('User not found');
    }

    const userRole = await this.userRoleModel.findOne({ user: user.id });

    const role = await this.roleModel.findById(userRole?.role);

    return {
      ...user.toObject(),
      role: role ? role.name : null,
    };
  };
}

export const userService = new UserService(UserModel, UserRoleModel, RoleModel);
