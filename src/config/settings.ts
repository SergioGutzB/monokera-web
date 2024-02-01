/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Settings } from '@/types';

const settings: Settings = {
  apiUrl: process.env.NEXT_PUBLIC_V1_API_URL as string,
};

export default settings;
