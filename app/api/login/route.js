import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Kết nối database
        await connectDB();

        // Tìm user theo email và password
        const user = await User.findOne({ 
            email: email,
            password: password 
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { 
                message: 'Login successful',
                user: user 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
