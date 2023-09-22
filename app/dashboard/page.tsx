'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

function DashboardPage() {
  return (
    <div>
      <Button
        variant="secondary"
        onClick={(event) => {
          event.preventDefault();
          signOut({
            callbackUrl: `${window.location.origin}/auth`,
          });
        }}
      >
        Sign out
      </Button>
      This is some super secret content you must not see.
    </div>
  );
}

export default DashboardPage;
