import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCreatedTime = (date: Date) => {
  const now = dayjs();
  const daysAgo = now.diff(date, 'day');
  const hoursAgo = now.diff(date, 'hour');
  const minutesAgo = now.diff(date, 'minute');

  if (daysAgo > 0) {
    return `${daysAgo}d`;
  }
  if (hoursAgo > 0) {
    return `${hoursAgo}h`;
  }
  if (minutesAgo > 0) {
    return `${minutesAgo}m`;
  } else {
    return 'just now';
  }
};
