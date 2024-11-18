import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        const { email, password, fullName, phone, address } = await req.json();

        // Kết nối database
        await connectDB();

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 400 }
            );
        }

        // Tạo user mới
        const newUser = await User.create({
            userId: uuidv4(),
            email,
            password,
            fullName,
            phone,
            address
        });

        return NextResponse.json(
            { 
                message: 'User created successfully',
                user: newUser 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
