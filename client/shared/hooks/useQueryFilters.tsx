import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import QueryString from 'qs';
import { Filters } from './useFilters';

export const useQueryFilters = (filters: Filters) => {
  const { salary, selectedJobType, company, selectedYears, position } = filters;
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...(salary && { salary: salary }),
      ...(selectedJobType && { jobType: selectedJobType }),
      ...(company && { company: company }),
      ...(selectedYears && { years: selectedYears }),
      ...(position && { position: position }),
    };

    const query = QueryString.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });
  }, [router, salary, selectedJobType, company, selectedYears, position]);
};
