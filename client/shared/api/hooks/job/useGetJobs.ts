import { useAuthedQuery } from '../useAuthedQuery';
import { IJob } from '@/shared/types/job/job.interface';
import { Filters } from '@/shared/hooks/useFilters';

const createKeys = (filters: Filters) => [filters, 'jobs'];
const useGetJobs = (filters: Filters) =>
  useAuthedQuery<IJob[]>(createKeys(filters), 'jobs', filters, {}, 1000);

export default useGetJobs;
