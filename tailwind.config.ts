import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '500px',
        md: '800px',
        lg: '1200px',
        xl: '1536px',
      },
      colors: {
        primary: '#7c3aed',
        light: '#ddd6fe',
        brand: {
          accent: '#c084fc',
          main: '#d8b4fe',
        },
        active: '#4ade80',
        cancelled: '#ef4444',
        expired: '#6b7280',
        text: {
          primary: '#0C0F19',
          secondary: '#9ca3af',
          dark: '#4b5563',
          light: '#e5e7eb',
        },
        background: {
          primary: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
export default config;
