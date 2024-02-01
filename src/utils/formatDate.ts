import { formatInTimeZone } from 'date-fns-tz';

const formatDateUTC = (date: string): string => {
  if (!date) return '-';
  return formatInTimeZone(new Date(date), 'UTC', 'yyyy-MM-dd');
};

export default formatDateUTC;
