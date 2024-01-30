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
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: '500px',
        md: '800px',
        lg: '1200px',
        xl: '1536px',
      },
      colors: {
        violet: '#5F24C6',
        brand: {
          accent: '#5F24C6',
          main: '#4916A2',
        },
        text: {
          primary: '#0C0F19',
          secondary: '#FFFFFF',
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
  plugins: [],
};
export default config;
