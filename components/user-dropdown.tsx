'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

function UserDropdown({ user }: { user: Session['user'] }) {
  const fallbackName =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(2) || 'GS';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] px-4 flex items-center justify-start"
          size="lg"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.image || ''} alt="@shadcn" />
            <AvatarFallback className="text-xs">{fallbackName}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
          <p className="w-full text-left ml-2">{user?.name || ' '}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" side="top">
        <DropdownMenuLabel className="text-muted-foreground">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut({
              callbackUrl: '/auth',
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
