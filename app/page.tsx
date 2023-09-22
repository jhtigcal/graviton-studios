import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/auth');
  }
}

export default HomePage;
