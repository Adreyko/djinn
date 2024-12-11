export interface IUser {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithRole extends IUser {
  role: string;
}

export type UserCreate = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdate = Partial<UserCreate>;
