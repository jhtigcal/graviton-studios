import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserAuthForm from '@/components/user-auth-form';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

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
