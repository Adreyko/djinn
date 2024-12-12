import { User } from '@/shared/types/user.interface';
import { useAuthedQuery } from '../useAuthedQuery';

const createQueryKey = () => ['user', 'role'];
export const useGetUser = () =>
  useAuthedQuery<User | null>(createQueryKey(), 'user', {
    refetchOnMount: true,
  });
