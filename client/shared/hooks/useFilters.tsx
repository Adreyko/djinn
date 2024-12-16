import { useSearchParams } from 'next/navigation';
import { useForm } from './useForm';
import { useQueryFilters } from './useQueryFilters';

export interface Filters {
  years: string[];
  jobType: string[];
  salary: string[];
  company: string;
  position: string;
  page?: number;
  limit?: number;
}

interface UseFiltersReturn {
  form: Filters;
  setYears: (value: string[]) => void;
  setJobType: (value: string[]) => void;
  setSalary: (value: string[]) => void;
  setCompany: (value: string) => void;
  setPosition: (value: string) => void;
  setPage: (value: string) => void;
  setLimit: (value: string) => void;
  resetForm: () => void;
}

export default function useFilters(): UseFiltersReturn {
  const searchParams = useSearchParams();
  const initialForm: Filters = {
    years: searchParams.get('years')?.split(',') ?? [],
    jobType: searchParams.get('jobType')?.split(',') ?? [],
    salary: searchParams.get('salary')?.split(',') ?? ['400'],
    company: searchParams.get('company') ?? '',
    position: searchParams.get('position') ?? '',
    page: parseInt(searchParams.get('page') ?? '1'),
    limit: parseInt(searchParams.get('limit') ?? '10'),
  };

  const [form, handleFormChange, resetForm] = useForm(initialForm);

  const setYears = (value: string[]) => handleFormChange(value, 'years');
  const setJobType = (value: string[]) => handleFormChange(value, 'jobType');
  const setSalary = (value: string[]) => handleFormChange(value, 'salary');
  const setCompany = (value: string) => handleFormChange(value, 'company');
  const setPosition = (value: string) => handleFormChange(value, 'position');
  const setPage = (value: string) => handleFormChange(value, 'page');
  const setLimit = (value: string) => handleFormChange(value, 'limit');

  useQueryFilters(form);

  return {
    form,
    setYears,
    setJobType,
    setSalary,
    setCompany,
    setPosition,
    resetForm,
    setPage,
    setLimit,
  };
}
