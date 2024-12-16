import { Filters } from '@/shared/hooks/useFilters';
import { useAuthedQuery } from '../useAuthedQuery';

const createKeys = (filters: Filters) => [filters, 'jobs', 'count'];
const useGetJobsCount = (filters: Filters) =>
  useAuthedQuery<number>(createKeys(filters), 'jobs/count', filters);

export default useGetJobsCount;
