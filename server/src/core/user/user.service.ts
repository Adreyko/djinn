import { UserModel } from './user.model';
import { UserCreate, IUser } from '@djinn/models';

export interface ClerkWebhookData {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
      verification: any;
    }>;
    username: string;
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
}

export class UserService {
  constructor(private userModel: typeof UserModel) {}

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

  public extractUserData(data: ClerkWebhookData['data']) {
    if (!data.email_addresses?.[0]?.email_address) {
      throw new Error('Email address is required');
    }

    return {
      clerkId: data.id,
      email: data.email_addresses[0].email_address,
      firstName: data.first_name,
      lastName: data.last_name,
    };
  }
}

export const userService = new UserService(UserModel);
