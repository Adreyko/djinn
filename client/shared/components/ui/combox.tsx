/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useState, useEffect } from 'react';
import { Popover, PopoverContent } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { PopoverAnchor } from '@radix-ui/react-popover';

interface ComboboxItem<T> {
  label: string;
  value: T;
  logo: string;
}

interface ComboboxProps<T> {
  items?: ComboboxItem<T>[];
  value?: string;
  onChange?: (value: boolean) => void;
  open?: boolean;
  trigger: ReactNode;
  onSelected?: (value: T, label?: string, logo?: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  noItemsText?: string;
}

export function Combobox<T>({
  items,
  value,
  onChange,
  open,
  onSelected,
  trigger,
  inputRef,
  noItemsText,
}: ComboboxProps<T>) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (inputRef?.current) {
      setWidth(inputRef.current.offsetWidth);
    }
  }, [inputRef]);

  return (
    <Popover open={open} onOpenChange={onChange}>
      <PopoverAnchor asChild>{trigger}</PopoverAnchor>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className='p-0'
        style={{ width }}
      >
        <Command>
          <CommandList>
            <CommandEmpty className='p-2'>{noItemsText}</CommandEmpty>
            <CommandGroup>
              {items?.map((item) => {
                return (
                  <CommandItem
                    className='cursor-pointer'
                    key={item.label}
                    onSelect={() => onSelected?.(item.value, item.label)}
                  >
                    <img src={item.logo} alt={item.label} className='w-5 h-5' />
                    {item.label}
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === item.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
