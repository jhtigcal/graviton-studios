import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserAuthForm from '@/components/user-auth-form';
import { getCurrentUser } from '@/lib/session';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in to your account',
};

async function AuthPage() {
  const user = await getCurrentUser();

  if (user) redirect('/dashboard');

  return (
    <div>
      <Card className="shadow-lg w-full">
        <CardHeader>
          <CardTitle>Sign in.</CardTitle>
          <CardDescription>
            Enter your email address to sign in to your account.
          </CardDescription>
        </CardHeader>
        <UserAuthForm />
      </Card>
    </div>
  );
}

export default AuthPage;
