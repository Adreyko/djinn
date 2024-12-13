'use client';
import React from 'react';
import CompanySearch from './CompanySearch';
import { useQueryFilters } from '@/shared/hooks/useQueryFilters';

const Filters = () => {
  return (
    <div>
      <CompanySearch value='' />
    </div>
  );
};

export default Filters;
