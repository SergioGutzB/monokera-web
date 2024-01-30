import Policies from '@/components/Policies';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Policies />
    </MainLayout>
  );
}
