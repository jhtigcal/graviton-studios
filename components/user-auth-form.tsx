'use client';

import { userAuthSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { CardContent, CardFooter } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import DiscordIcon from './ui/icons/discord-icon';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

type UserAuthFormData = z.infer<typeof userAuthSchema>;

function UserAuthForm() {
  const form = useForm<UserAuthFormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDiscordLoading, setIsDiscordLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  async function onSubmit(data: UserAuthFormData) {
    setIsLoading(true);
    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    });
  }

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="hello@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Sign in with email
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardContent>
        <div className="relative">
          <div className="absolute inset-0 flex items-center -bottom-1">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs lowercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            setIsDiscordLoading(true);
            signIn('discord');
          }}
        >
          {isDiscordLoading ? (
            <DiscordIcon className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <DiscordIcon className="h-4 w-4 mr-2" />
          )}
          Discord
        </Button>
      </CardFooter>
    </>
  );
}

export default UserAuthForm;
