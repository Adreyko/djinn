'use client';
import React from 'react';
import Filters from './Filters/Filters';
import Jobs from './Jobs';

import useFilters from '@/shared/hooks/useFilters';
import { PaginationGroup } from '@/shared/components/ui/pagination';
import useGetJobsCount from '@/shared/api/hooks/job/useGetJobsCount';
import Title from './Title';
import useGetJobs from '@/shared/api/hooks/job/useGetJobs';

const JobsContent = () => {
  const {
    form,
    setYears,
    setJobType,
    setSalary,
    setCompany,
    setPosition,
    setPage,
  } = useFilters();

  const { data: jobs, isLoading } = useGetJobs(form);

  const { data: count } = useGetJobsCount(form);

  return (
    <>
      <div className='w-[60%] pb-10'>
        <Title count={count ?? 0} />
        <Jobs isLoading={isLoading} jobs={jobs ?? []} />
        <div className='mr-auto'>
          <PaginationGroup
            totalPages={count ? Math.ceil(count / (form.limit ?? 10)) : 1}
            currentPage={form.page ?? 1}
            onPageChange={setPage as unknown as (page: number) => void}
          />
        </div>
      </div>
      <div className='w-1/4 flex-1'>
        <Filters
          setCompany={setCompany}
          setPosition={setPosition}
          setSelectedJobType={setJobType}
          setSelectedYears={setYears}
          setSalary={setSalary}
          form={form}
        />
      </div>
    </>
  );
};

export default JobsContent;
