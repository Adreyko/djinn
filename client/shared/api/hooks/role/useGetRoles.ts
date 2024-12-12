import { RoleType } from '@/shared/types';
import { useAuthedQuery } from '../useAuthedQuery';

const createKeys = () => ['roles'];
export const useGetRoles = () =>
  useAuthedQuery<RoleType[]>(createKeys(), 'role');
