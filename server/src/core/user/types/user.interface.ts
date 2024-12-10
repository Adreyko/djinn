export interface IUser {
  id: string;
  clerkId: string;
  email: string;
  role: string;
  username: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreate = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdate = Partial<UserCreate>;
