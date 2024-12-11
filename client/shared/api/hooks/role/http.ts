import { AssignRoleDto, RoleType } from '@/shared/types';
import http from '../../http';

export const getRoles = async () => http.get<RoleType[]>('role');

export const assignUserRole = async (data: AssignRoleDto) =>
  http.post<RoleType>('role/assign-role', data);
