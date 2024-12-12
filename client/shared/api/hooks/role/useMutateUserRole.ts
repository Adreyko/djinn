import { useQueryClient } from '@tanstack/react-query';
import { useAuthedMutation } from '../useAuthedQuery';
import { User } from '@/shared/types/user.interface';
import { RoleDto } from '@/shared/types';

export const useMutateUserRole = () => {
  const queryClient = useQueryClient();
  return useAuthedMutation<User | null, RoleDto>('role/assign-role', 'post', {
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'role'], data);
    },
  });
};

export default useMutateUserRole;
