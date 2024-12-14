import { RoleType } from '@/shared/types';
import { useAuthedQuery } from '../useAuthedQuery';
import { IJob } from '@/shared/types/job/job.interface';

const createKeys = () => ['jobs'];
export const useGetJobs = () => useAuthedQuery<IJob[]>(createKeys(), 'jobs');
