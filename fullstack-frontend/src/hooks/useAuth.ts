'use client';

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/types/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UseAuthReturn {
  isAuthenticated: () => boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Kiểm tra authentication khi component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const hasToken = !!authService.getAccessToken();
        setIsAuth(hasToken);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setIsInitialized(true);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await authService.login(credentials);
      authService.setTokens(response.accessToken, response.refreshToken);
      setIsAuth(true);
      toast.success('Đăng nhập thành công!');
      router.replace('/dashboard'); // Sử dụng replace thay cho push
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (userData: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await authService.register(userData);
      authService.setTokens(response.accessToken, response.refreshToken);
      setIsAuth(true);
      router.push('/login');
      toast.success('Đăng ký thành công!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng ký thất bại';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    authService.clearTokens();
    setIsAuth(false);
    router.push('/login');
  }, [router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Thêm hàm kiểm tra xác thực
  const isAuthenticated = useCallback(() => {
    // Chỉ trả về true nếu đã khởi tạo và có token
    return isInitialized && isAuth;
  }, [isInitialized, isAuth]);

  return {
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated,
  };
}; 