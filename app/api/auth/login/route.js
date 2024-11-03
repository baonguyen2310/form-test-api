import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [username]
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for login
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Username is required
 */
export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');

  if (!username) {
    return NextResponse.json({ message: 'Username is required' }, { status: 400 });
  }

  // Ở đây bạn có thể thêm logic kiểm tra username trong cơ sở dữ liệu
  // Nhưng trong ví dụ đơn giản này, chúng ta sẽ chỉ trả về thông báo thành công

  return NextResponse.json({ message: username + ' đã đăng nhập thành công' }, { status: 200 });
}
