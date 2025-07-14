// Định nghĩa interface cho dữ liệu form
export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

// Định nghĩa props chung cho các component form
export interface BaseFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsLogin: (isLogin: boolean) => void;
}

// Định nghĩa props cho LoginForm
export interface LoginFormProps extends BaseFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

// Định nghĩa props cho RegisterForm
export interface RegisterFormProps extends BaseFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

// Interface cho dữ liệu login
export interface LoginFormData {
  email: string;
  password: string;
}

// Interface cho dữ liệu register
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface cho response từ API
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// Interface cho error response
export interface ApiError {
  message: string;
  statusCode?: number;
}


