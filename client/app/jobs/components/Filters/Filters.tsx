'use client';
import CompanySearch from './CompanySearch';
import JobTypeFilter from './JobTypeFilter';
import PositionSearch from './PositionSearch';
import SalaryFilter from './SalaryFilter';
import YearsFilter from './YearsFilter';
import { Filters as IFilters } from '@/shared/hooks/useFilters';
import { FC } from 'react';

interface FiltersProps {
  form: IFilters;
  setSelectedYears: (value: string[]) => void;
  setSelectedJobType: (value: string[]) => void;
  setSalary: (value: string[]) => void;
  setCompany: (value: string) => void;
  setPosition: (value: string) => void;
}

const Filters: FC<FiltersProps> = ({
  form,
  setSelectedYears,
  setSelectedJobType,
  setSalary,
  setCompany,
  setPosition,
}) => {
  return (
    <div className='flex flex-col gap-6'>
      <PositionSearch value={form.position} onSearch={setPosition} />
      <CompanySearch value={form.company} onSelect={setCompany} />
      <YearsFilter
        selectedYears={form.years}
        setSelectedYears={setSelectedYears}
      />
      <JobTypeFilter
        selectedJobType={form.jobType}
        setSelectedJobType={setSelectedJobType}
      />
      <SalaryFilter salary={form.salary} setSalary={setSalary} />
    </div>
  );
};

export default Filters;
