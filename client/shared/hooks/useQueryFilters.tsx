import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import QueryString from 'qs';
import { Filters } from './useFilters';

export const useQueryFilters = (filters: Filters) => {
  const { salary, jobType, company, years, position, limit, page } = filters;
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...(salary && { salary: salary }),
      ...(jobType && { jobType: jobType }),
      ...(company && { company: company }),
      ...(years && { years: years }),
      ...(position && { position: position }),
      ...(limit && { limit: limit }),
      ...(page && { page: page }),
    };

    const query = QueryString.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });
  }, [router, salary, years, company, jobType, position, limit, page]);
};
