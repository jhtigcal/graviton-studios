import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Dashboard',
};

function DashboardPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Welcome to your dashboard. You are not supposed to see this content if
          you are not properly authenticated.
        </CardDescription>
      </CardHeader>
    </>
  );
}

export default DashboardPage;
