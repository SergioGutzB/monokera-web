import { PolicyStatus } from '@/types';

export const getColorStatusClass = (status: string | PolicyStatus): string => {
  const colorStatus: { [x: string]: string } = {
    active: 'bg-green-500',
    cancelled: 'bg-red-500',
    expired: 'bg-gray-500',
  };
  return colorStatus[status];
};

export const getColorStatusStyle = (status: string | PolicyStatus): string => {
  const colorStatus: { [x: string]: string } = {
    active: 'green',
    cancelled: 'red',
    expired: 'gray',
  };
  return colorStatus[status];
};
