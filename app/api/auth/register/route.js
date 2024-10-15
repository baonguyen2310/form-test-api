import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');

  if (!username) {
    return NextResponse.json({ message: 'Username is required' }, { status: 400 });
  }

  // Ở đây bạn có thể thêm logic để lưu username vào cơ sở dữ liệu
  // Nhưng trong ví dụ đơn giản này, chúng ta sẽ chỉ trả về thông báo thành công

  return NextResponse.json({ message: username + ' đã đăng ký thành công' }, { status: 201 });
}
