import { RoleType } from '@/shared/types';
import http from '../../http';

export const getRoles = async () => http.get<RoleType[]>('role');
