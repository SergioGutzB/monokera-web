import { PolicyStatus } from '@/types';
import styles from '@/styles/main.module.css';

export const getColorStatusClass = (status: string | PolicyStatus): string => {
  const colorStatus: { [x: string]: string } = {
    active: styles.active,
    cancelled: styles.cancelled,
    expired: styles.expired,
  };
  return colorStatus[status];
};

export const getColorStatusStyle = (status: string | PolicyStatus): string => {
  const colorStatus: { [x: string]: string } = {
    active: styles.active,
    cancelled: styles.cancelled,
    expired: styles.expired,
  };
  return colorStatus[status];
};
