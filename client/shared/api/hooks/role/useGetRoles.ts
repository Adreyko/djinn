import { useQuery } from '@tanstack/react-query';
import { getRoles } from '../https';

const createKeys = () => ['roles'];
export const useGetRoles = () =>
  useQuery({ queryKey: createKeys(), queryFn: getRoles });
