import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserAuthForm from '@/components/user-auth-form';

function AuthPage() {
  return (
    <div>
      <Card className="shadow-lg min-w-fit w-96 max-w-full">
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
