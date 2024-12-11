import http from '../../http';
import { Role } from '@djinn/models';

export const getRoles = async () => http.get<Role[]>('role');
