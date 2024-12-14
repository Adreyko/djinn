import { GroupSelect } from '@/shared/components/ui/group-select';
import React, { FC, useState } from 'react';

const yearsOfExperience = [
  { label: 'No experience', value: '0' },
  { label: '1 year', value: '1' },
  { label: '2 years', value: '2' },
  { label: '3 years', value: '3' },
  { label: '4 years', value: '4' },
  { label: '5 years', value: '5' },
  { label: 'More than 5 years', value: '5+' },
];

interface YearsFilterProps {
  selectedYears: string[];
  setSelectedYears: (selectedYears: string[]) => void;
}
const YearsFilter: FC<YearsFilterProps> = ({
  selectedYears,
  setSelectedYears,
}) => {
  return (
    <div>
      <label>Work experience</label>

      <GroupSelect
        options={yearsOfExperience}
        onChange={setSelectedYears}
        selectedValues={selectedYears}
      />
    </div>
  );
};

export default YearsFilter;
