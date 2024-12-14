import { GroupSelect } from '@/shared/components/ui/group-select';
import useFilters from '@/shared/hooks/useFilters';
import { EmploymentTypeEnum } from '@/shared/types/job/job.enum';
import { FC } from 'react';

const jobTypes = [
  { label: 'Full Time', value: EmploymentTypeEnum.FullTime },
  { label: 'Part Time', value: EmploymentTypeEnum.PartTime },
  { label: 'Contract', value: EmploymentTypeEnum.Contract },
  { label: 'Internship', value: EmploymentTypeEnum.Internship },
  { label: 'Freelance', value: EmploymentTypeEnum.Freelance },
  { label: 'Office', value: EmploymentTypeEnum.Office },
];

interface JobTypeFilterProps {
  selectedJobType: string[];
  setSelectedJobType: (selectedJobType: string[]) => void;
}

const JobTypeFilter: FC<JobTypeFilterProps> = ({
  selectedJobType,
  setSelectedJobType,
}) => {
  return (
    <div>
      <label> Job Type</label>
      <GroupSelect
        options={jobTypes}
        selectedValues={selectedJobType}
        onChange={setSelectedJobType}
      />
    </div>
  );
};

export default JobTypeFilter;
