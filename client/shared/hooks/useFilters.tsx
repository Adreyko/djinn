import { useSearchParams } from 'next/navigation';
import { useForm } from './useForm';

export interface Filters {
  selectedYears: string[];
  selectedJobType: string[];
  salary: string[];
  company: string;
  position: string;
}

interface UseFiltersReturn {
  form: Filters;
  setSelectedYears: (value: string[]) => void;
  setSelectedJobType: (value: string[]) => void;
  setSalary: (value: string[]) => void;
  setCompany: (value: string) => void;
  setPosition: (value: string) => void;
  resetForm: () => void;
}

export default function useFilters(): UseFiltersReturn {
  const searchParams = useSearchParams();
  const initialForm: Filters = {
    selectedYears: searchParams.get('years')?.split(',') ?? [],
    selectedJobType: searchParams.get('jobType')?.split(',') ?? [],
    salary: searchParams.get('salary')?.split(',') ?? ['400'],
    company: searchParams.get('company') ?? '',
    position: searchParams.get('position') ?? '',
  };

  const [form, handleFormChange, resetForm] = useForm(initialForm);

  const setSelectedYears = (value: string[]) =>
    handleFormChange(value, 'selectedYears');
  const setSelectedJobType = (value: string[]) =>
    handleFormChange(value, 'selectedJobType');
  const setSalary = (value: string[]) => handleFormChange(value, 'salary');
  const setCompany = (value: string) => handleFormChange(value, 'company');
  const setPosition = (value: string) => handleFormChange(value, 'position');

  return {
    form,
    setSelectedYears,
    setSelectedJobType,
    setSalary,
    setCompany,
    setPosition,
    resetForm,
  };
}
