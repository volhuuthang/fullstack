'use client';

import { useState, useEffect } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const showSidebar = !['/login', '/register'].includes(pathname);

  return (
    <>
      {isClient ? (
        <AuthProvider>
          <div className="flex">
            {showSidebar && <Sidebar />}
            <main className={`flex-1 ${showSidebar ? 'ml-0 md:ml-64' : ''}`}>
            {children}
            </main>
          </div>
        </AuthProvider>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
} 