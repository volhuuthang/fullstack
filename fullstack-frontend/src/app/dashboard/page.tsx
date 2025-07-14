'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export default function DashboardPage() {
  const { logout, isAuthenticated } = useAuth();
  if (!isAuthenticated()) {
    return <div className="flex items-center justify-center min-h-screen">Vui lòng đăng nhập!</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 py-5 mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </div>

          {/* User Info Card */}
          <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                Chào mừng, Admin!
                </h2>
                <p className="text-gray-600">Bạn đã đăng nhập thành công</p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Thống kê</h3>
              <p className="text-gray-600">Nội dung thống kê sẽ được hiển thị ở đây</p>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Hoạt động gần đây</h3>
              <p className="text-gray-600">Danh sách hoạt động sẽ được hiển thị ở đây</p>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Cài đặt</h3>
              <p className="text-gray-600">Các tùy chọn cài đặt sẽ được hiển thị ở đây</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
