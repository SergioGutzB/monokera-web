import type { ChildrenProps } from '@/types';

export default function MainLayout({ children }: ChildrenProps) {
  return <div className="h-full flex flex-col bg-var(--background) px-2 md:px-15 lg:px-20">{children}</div>;
}
