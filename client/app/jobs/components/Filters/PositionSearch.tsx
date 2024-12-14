import { Input } from '@/shared/components/ui/input';
import React, { FC } from 'react';

interface PositionSearchProps {
  onSearch?: (value: string) => void;
  value?: string;
}
const PositionSearch: FC<PositionSearchProps> = ({ onSearch, value }) => {
  return (
    <div>
      <label>Search by Position</label>
      <Input value={value} onChange={onSearch} placeholder='e.g. front-end' />
    </div>
  );
};

export default PositionSearch;
