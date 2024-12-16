import { ICompany } from '@/shared/types/job/job.interface';
import { useAuthedQuery } from '../useAuthedQuery';

const createQueryKey = () => ['companies'];
const useGetCompanies = () =>
  useAuthedQuery<ICompany[]>(createQueryKey(), 'jobs/companies');

export default useGetCompanies;
