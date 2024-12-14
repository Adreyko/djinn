import { Slider } from '@/shared/components/ui/slider';
import React, { FC } from 'react';

interface SalaryFilterProps {
  salary: string[];
  setSalary: (value: string[]) => void;
}

const SalaryFilter: FC<SalaryFilterProps> = ({ salary, setSalary }) => {
  const mapped = salary.map((s) => parseInt(s, 10));
  return (
    <div>
      <label className='mb-6'>Salary</label>
      <p className='text-sm mb-2'>
        from <span className='text-green-500'>{salary.join(', ')}$</span>
      </p>
      <Slider
        value={mapped}
        max={50000}
        step={100}
        onValueChange={(value) => setSalary(value.map(String))}
      />
    </div>
  );
};

export default SalaryFilter;
