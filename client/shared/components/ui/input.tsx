import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type HTMLInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
>;

export interface InputProps extends HTMLInputProps {
  label?: string;
  icon?: React.ReactNode;
  onChange?: (value: string, name: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, type, readOnly, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value, e.target.name);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onChange?.(
          (e.target as HTMLInputElement).value,
          (e.target as HTMLInputElement).name
        );
      }
    };

    return (
      <div className='flex flex-col gap-2 w-full relative text-sm'>
        {label && <div className='text-base text-gray'>{label}</div>}
        <div
          className={cn(
            'flex h-fit w-full rounded-lg bg-grayLight focus:border-0  text-gray relative  border border-input bg-transparent  text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            { 'bg-transparent': readOnly },
            className
          )}
        >
          <input
            disabled={readOnly}
            onChange={handleChange}
            type={type}
            ref={ref}
            {...props}
            onKeyUp={handleKeyPress}
            className={cn(
              'bg-transparent  focus-visible:outline-none w-full h-full px-3 py-2',
              { 'px-0': readOnly }
            )}
          />
          {icon && <div className='h-full'>{icon}</div>}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
