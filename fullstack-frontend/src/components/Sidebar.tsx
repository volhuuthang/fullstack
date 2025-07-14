import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, LayoutDashboard, Users, ListChecks, Settings } from 'lucide-react';

export default function Sidebar() {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated()) return null;

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#181F2A] shadow-lg flex flex-col justify-between z-40">
      <div>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="text-2xl font-bold text-white">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-200 rounded-lg hover:bg-gray-700 transition">
                <LayoutDashboard className="w-5 h-5" />
                Overview
              </Link>
            </li>
            <li>
              <Link href="/user" className="flex items-center gap-3 px-4 py-3 text-gray-200 rounded-lg hover:bg-gray-700 transition">
                <Users className="w-5 h-5" />
                Users
              </Link>
            </li>
            <li>
              <Link href="/task" className="flex items-center gap-3 px-4 py-3 text-gray-200 rounded-lg hover:bg-gray-700 transition">
                <ListChecks className="w-5 h-5" />
                Task
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-200 rounded-lg hover:bg-gray-700 transition">
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
} 