import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import QueryString from 'qs';

export const useQueryFilters = (filters: any) => {
  const { search, value } = filters;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params: any = {};

    if (search) {
      params.search = search;
    }
    const query = QueryString.stringify(params, { addQueryPrefix: true });

    router.push(`${query}`, { scroll: false });
  }, [router, search, value]);
};
