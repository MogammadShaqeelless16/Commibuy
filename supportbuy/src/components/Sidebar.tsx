import Link from 'next/link';
import { HomeIcon, UserGroupIcon, UsersIcon, ShoppingCartIcon, ChartBarIcon } from '@heroicons/react/24/outline'; // Updated to v2

const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-6">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <HomeIcon className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/leads" className="flex items-center space-x-2">
            <UserGroupIcon className="w-6 h-6" />
            <span>Leads</span>
          </Link>
        </li>
        <li>
          <Link href="/customers" className="flex items-center space-x-2">
            <UsersIcon className="w-6 h-6" />
            <span>Customers</span>
          </Link>
        </li>
        <li>
          <Link href="/orders" className="flex items-center space-x-2">
            <ShoppingCartIcon className="w-6 h-6" />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link href="/finance" className="flex items-center space-x-2">
            <ChartBarIcon className="w-6 h-6" />
            <span>Finance</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
