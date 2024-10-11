import { NextResponse } from 'next/server';

// Chỉ định các route sẽ áp dụng middleware
export const config = {
  matcher: '/api/:path*',
};

export function middleware(request) {
  // Chỉ áp dụng cho các route API
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Tạo NextResponse object
    const response = NextResponse.next();

    // Thêm CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Xử lý preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }
}