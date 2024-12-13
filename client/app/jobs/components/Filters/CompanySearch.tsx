import { Combobox } from '@/shared/components/ui/combox';
import { Input } from '@/shared/components/ui/input';
import { useQueryFilters } from '@/shared/hooks/useQueryFilters';
import { useSearchParams } from 'next/navigation';
import React, { FC, useRef, useState } from 'react';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  value?: string;
}

const mockedCompanies = [
  'Microsoft',
  'Google',
  'Facebook',
  'Apple',
  'Amazon',
  'Netflix',
  'Tesla',
];
const companyLogos: { [key: string]: string } = {
  Microsoft: 'https://logo.clearbit.com/microsoft.com',
  Google: 'https://logo.clearbit.com/google.com',
  Facebook: 'https://logo.clearbit.com/facebook.com',
  Apple: 'https://logo.clearbit.com/apple.com',
  Amazon: 'https://logo.clearbit.com/amazon.com',
  Netflix: 'https://logo.clearbit.com/netflix.com',
  Tesla: 'https://logo.clearbit.com/tesla.com',
};
const companies = mockedCompanies.map((company) => ({
  name: company,
  logo: companyLogos[company],
}));
const CompanySearch: FC<SearchProps> = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || ''
  );

  useQueryFilters({ search });
  const [openCombobox, setOpenCombobox] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchedCompanies, setSearchedCompanies] = useState<any[]>([]);

  const onCompanySelect = (company: string) => {
    setSearch(company);
    setOpenCombobox(false);
  };

  const mappedCompanies = searchedCompanies.map(({ name, logo }) => ({
    label: name,
    value: name,
    logo,
  }));

  const handleSearch = (value: string) => {
    setSearch(value);
    const filteredCompanies = companies.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCompanies(filteredCompanies);
  };

  return (
    <div className='flex flex-col'>
      Find a company
      <Combobox
        inputRef={inputRef}
        value={search}
        onSelected={onCompanySelect}
        noItemsText='No companies found'
        trigger={
          <Input
            ref={inputRef}
            onBlur={() => setOpenCombobox(false)}
            onFocus={() => setOpenCombobox(true)}
            onChange={handleSearch}
            // onKeyPress={handleKeyPress}
            value={search}
            placeholder='e.g. Microsoft'
          />
        }
        items={mappedCompanies}
        open={openCombobox}
        onChange={setOpenCombobox}
      />
    </div>
  );
};

export default CompanySearch;
