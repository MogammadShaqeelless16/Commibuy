import Link from 'next/link';
import { HomeIcon, UserGroupIcon, UsersIcon, ShoppingCartIcon, ChartBarIcon } from '@heroicons/react/24/outline'; // Updated to v2

const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-6 fixed top-0 left-0 h-full md:w-64 md:flex-shrink-0 md:relative">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard">
            <span className="flex items-center space-x-2">
              <HomeIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/leads">
            <span className="flex items-center space-x-2">
              <UserGroupIcon className="w-6 h-6" />
              <span>Leads</span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/customers">
            <span className="flex items-center space-x-2">
              <UsersIcon className="w-6 h-6" />
              <span>Customers</span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <span className="flex items-center space-x-2">
              <ShoppingCartIcon className="w-6 h-6" />
              <span>Orders</span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/finance">
            <span className="flex items-center space-x-2">
              <ChartBarIcon className="w-6 h-6" />
              <span>Finance</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
