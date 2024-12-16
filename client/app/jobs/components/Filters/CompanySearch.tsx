import useGetCompanies from '@/shared/api/hooks/job/useGetCompanies';
import { Combobox } from '@/shared/components/ui/combox';
import { Input } from '@/shared/components/ui/input';
import { ICompany } from '@/shared/types/job/job.interface';
import { FC, useRef, useState } from 'react';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  value?: string;
  onSelect?: (value: string) => void;
}

const CompanySearch: FC<SearchProps> = ({ onSelect, value }) => {
  const [search, setSearch] = useState<string>(value ?? '');

  const [openCombobox, setOpenCombobox] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: companies, isLoading } = useGetCompanies();

  const [searchedCompanies, setSearchedCompanies] = useState<ICompany[]>([]);

  const onCompanySelect = (company: string) => {
    setSearch(company);
    setOpenCombobox(false);

    onSelect?.(company);
  };

  const mappedCompanies = searchedCompanies.map(({ name, logo }) => ({
    label: name,
    value: name,
    logo,
  }));

  const handleSearch = (value: string) => {
    setSearch(value);
    const filteredCompanies = companies?.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCompanies(filteredCompanies ?? []);
  };

  return (
    <div className='flex flex-col'>
      <label> Find a company</label>
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
