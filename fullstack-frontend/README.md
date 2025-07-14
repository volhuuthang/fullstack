# FullStack Frontend

Ứng dụng frontend được xây dựng bằng Next.js 14 với TypeScript và Tailwind CSS.

## Tính năng

- ✅ Authentication (Login/Register)
- ✅ Protected Routes
- ✅ Responsive Design
- ✅ Modern UI với Tailwind CSS
- ✅ TypeScript support
- ✅ Context API cho state management

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env.local` trong thư mục gốc:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Chạy development server:
```bash
npm run dev
```

## Cấu trúc thư mục

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── login/             # Trang đăng nhập
│   ├── register/          # Trang đăng ký
│   ├── dashboard/         # Trang dashboard (protected)
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── AuthProvider.tsx   # Authentication context provider
│   └── ProtectedRoute.tsx # Route protection component
├── hooks/                 # Custom hooks
│   └── useAuth.ts         # Authentication hook
├── services/              # API services
│   └── auth.service.ts    # Authentication service
├── types/                 # TypeScript types
│   └── auth.ts           # Authentication types
└── lib/                   # Utility functions
    └── utils.ts          # Helper functions
```

## API Endpoints

Frontend kết nối với backend thông qua các endpoints sau:

- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/refresh` - Refresh token

## Authentication Flow

1. User nhập thông tin đăng nhập/đăng ký
2. Frontend gửi request đến backend API
3. Backend xác thực và trả về access token + refresh token
4. Frontend lưu tokens vào localStorage
5. User được redirect đến dashboard
6. Protected routes kiểm tra authentication status

## Components

### AuthProvider
Provider cho authentication context, wrap toàn bộ ứng dụng.

### ProtectedRoute
Component bảo vệ các trang cần authentication, tự động redirect về login nếu chưa đăng nhập.

### LoginForm & RegisterForm
Forms xử lý đăng nhập và đăng ký với validation và error handling.

## Hooks

### useAuth
Custom hook cung cấp các function:
- `login(credentials)` - Đăng nhập
- `register(userData)` - Đăng ký
- `logout()` - Đăng xuất
- `isAuthenticated()` - Kiểm tra trạng thái đăng nhập
- `user` - Thông tin user hiện tại
- `isLoading` - Trạng thái loading
- `error` - Error message

## Services

### authService
Service xử lý API calls:
- Quản lý tokens (access token, refresh token)
- Gửi requests đến backend
- Xử lý errors
- Helper methods cho authentication

## Development

### Chạy development server
```bash
npm run dev
```

### Build production
```bash
npm run build
```

### Lint code
```bash
npm run lint
```

## Backend Integration

Đảm bảo backend đang chạy trên port 3000 và có các endpoints:
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`

Backend cần trả về response format:
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```
