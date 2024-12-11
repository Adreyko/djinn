import { useAuthedQuery } from '../useAuthedQuery';

const createQueryKey = () => ['user'];
export const useGetUser = () => useAuthedQuery(createQueryKey(), 'user');
