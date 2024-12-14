'use client';
import useFilters from '@/shared/hooks/useFilters';
import CompanySearch from './CompanySearch';
import JobTypeFilter from './JobTypeFilter';
import PositionSearch from './PositionSearch';
import SalaryFilter from './SalaryFilter';
import YearsFilter from './YearsFilter';
import { useQueryFilters } from '@/shared/hooks/useQueryFilters';

const Filters = () => {
  const {
    setSelectedJobType,
    setPosition,
    setCompany,
    setSalary,
    setSelectedYears,

    form,
  } = useFilters();

  useQueryFilters(form);

  return (
    <div className='flex flex-col gap-6'>
      <PositionSearch value={form.position} onSearch={setPosition} />
      <CompanySearch value={form.company} onSelect={setCompany} />
      <YearsFilter
        selectedYears={form.selectedYears}
        setSelectedYears={setSelectedYears}
      />
      <JobTypeFilter
        selectedJobType={form.selectedJobType}
        setSelectedJobType={setSelectedJobType}
      />
      <SalaryFilter salary={form.salary} setSalary={setSalary} />
    </div>
  );
};

export default Filters;
