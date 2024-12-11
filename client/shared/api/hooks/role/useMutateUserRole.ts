import { useMutation } from '@tanstack/react-query';
import { assignUserRole } from './http';

const useMutateUserRole = () =>
  useMutation({
    mutationFn: assignUserRole,
  });

export default useMutateUserRole;
