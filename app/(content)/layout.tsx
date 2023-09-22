import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function ContentLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (!user) redirect('/auth');

  return <div className="min-h-screen">{children}</div>;
}
