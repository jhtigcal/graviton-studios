import Sidebar from '@/components/sidebar';
import { Card } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function ContentLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (!user) redirect('/auth');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="lg:m-2 grow w-full">
        <Card className="h-full bg-primary-foreground">
          <div className="px-4 py-2">{children}</div>
        </Card>
      </main>
    </div>
  );
}
