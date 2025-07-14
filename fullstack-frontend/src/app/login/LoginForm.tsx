import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormData } from '@/types/auth';

const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="p-8 border shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl border-white/20">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">Chào mừng trở lại!</h2>
          <p className="text-gray-600">Đăng nhập vào tài khoản của bạn</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full py-3 pl-12 pr-4 transition-all duration-200 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mật khẩu"
                className="w-full py-3 pl-12 pr-12 transition-all duration-200 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 transition-colors hover:text-blue-700">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
          
          <div className="text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 transition-colors hover:text-blue-700">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;