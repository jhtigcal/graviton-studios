import { getCurrentUser } from '@/lib/session';
import { ThemeToggle } from './theme-toggle';
import UserDropdown from './user-dropdown';

async function Sidebar() {
  const user = await getCurrentUser();
  return (
    <aside className="hidden w-[400px] flex-col md:flex py-10">
      <div className="container flex flex-col justify-between h-full">
        <div>
          <span className="text-2xl font-bold">Graviton studios</span>
        </div>
        <div className="flex gap-2">
          <UserDropdown user={user} />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
