import { Button } from './button';

interface Option {
  value: string;
  label: string;
}

interface GroupSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

const GroupSelect = ({
  options,
  selectedValues,
  onChange,
  className = '',
}: GroupSelectProps) => {
  const handleClick = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {options.map((option) => (
        <Button
          size={'sm'}
          key={option.value}
          variant={'outline'}
          onClick={() => handleClick(option.value)}
          className={`
            px-4 py-2 rounded-lg text-sm transition-colors
            ${
              selectedValues.includes(option.value)
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-300'
                : '  hover:bg-gray-300'
            }
          `}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export { GroupSelect };
