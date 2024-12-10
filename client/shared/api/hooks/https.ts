import http from '../http';

export const getRoles = async () => http.get('role');
