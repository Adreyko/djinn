import http from '../../http';

export const getUser = async () => http.get<any>('user');
