export interface User {
  id: string;
  name?: string;
  email: string;
  clerkId: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  role: 'employee' | 'employer';
}