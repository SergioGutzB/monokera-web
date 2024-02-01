import { Policy } from '@/types';
import { differenceInDays, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function calculatePolicyPercentage(policy: Policy): number {
  const currentDate = utcToZonedTime(new Date(), 'UTC');

  const fromDate = parseISO(policy.effective_from as string);
  const untilDate = parseISO(policy.effective_until as string);

  console.log({ fromDate, untilDate });
  const daysFromNow = differenceInDays(untilDate, currentDate);

  const totalDaysDifference = differenceInDays(untilDate, fromDate);

  console.log({ daysFromNow, totalDaysDifference, fromDate, untilDate });

  const percentageRemaining = (daysFromNow / totalDaysDifference) * 100;
  console.log('percentageRemaining: ', percentageRemaining);
  return percentageRemaining;
}
