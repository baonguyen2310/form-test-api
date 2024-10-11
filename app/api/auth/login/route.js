import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username } = await request.json();

  if (!username) {
    return NextResponse.json({ message: 'Username is required' }, { status: 400 });
  }

  // Ở đây bạn có thể thêm logic kiểm tra username trong cơ sở dữ liệu
  // Nhưng trong ví dụ đơn giản này, chúng ta sẽ chỉ trả về thông báo thành công

  return NextResponse.json({ message: username + ' đã đăng nhập thành công' }, { status: 200 });
}