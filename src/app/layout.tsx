import MainFooter from '@/components/Footer/Footer';
import '@/styles/globals.css';
import { ChildrenProps } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monokera Test',
  description: 'Monokera Test Frontend',
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <MainFooter />
      </body>
    </html>
  );
}
