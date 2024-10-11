import { NextResponse } from 'next/server';
import Cors from 'cors';

// Khởi tạo middleware cors
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: '*', // Thay thế bằng domain cụ thể trong môi trường production
  optionsSuccessStatus: 200,
});

// Helper function để chạy middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Middleware function
export async function middleware(request) {
  // Chỉ áp dụng cho các route API
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Tạo NextResponse object
    const response = NextResponse.next();

    // Chạy cors middleware
    await runMiddleware(request, response, cors);

    return response;
  }
}

// Chỉ định các route sẽ áp dụng middleware
export const config = {
  matcher: '/api/:path*',
};