import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Cart from "../../models/Cart";

// GET - Lấy giỏ hàng của user
export async function GET(request) {
    try {
        await connectDB();
        
        // Lấy userId từ query params hoặc auth session
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        
        return NextResponse.json(cart || { userId, items: [] });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// POST - Thêm sản phẩm vào giỏ hàng
export async function POST(request) {
    try {
        await connectDB();
        const { userId, productId, quantity } = await request.json();

        if (!userId || !productId || !quantity) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Chuyển đổi productId thành số
        const productIdNumber = Number(productId);

        if (isNaN(productIdNumber)) {
            return NextResponse.json(
                { message: "Product ID must be a number" },
                { status: 400 }
            );
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.productId === productIdNumber
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ 
                productId: productIdNumber, 
                quantity 
            });
        }

        await cart.save();
        return NextResponse.json(cart);
    } catch (error) {
        console.error('Cart error:', error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// PUT - Cập nhật số lượng sản phẩm
export async function PUT(request) {
    try {
        await connectDB();
        const { userId, productId, quantity } = await request.json();

        if (!userId || !productId || !quantity) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Chuyển đổi productId thành số
        const productIdNumber = Number(productId);

        if (isNaN(productIdNumber)) {
            return NextResponse.json(
                { message: "Product ID must be a number" },
                { status: 400 }
            );
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return NextResponse.json(
                { message: "Cart not found" },
                { status: 404 }
            );
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId === productIdNumber
        );

        if (itemIndex === -1) {
            return NextResponse.json(
                { message: "Product not found in cart" },
                { status: 404 }
            );
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        
        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Xóa sản phẩm khỏi giỏ hàng
export async function DELETE(request) {
    try {
        await connectDB();
        const { userId, productId } = await request.json();

        if (!userId || !productId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Chuyển đổi productId thành số
        const productIdNumber = Number(productId);

        if (isNaN(productIdNumber)) {
            return NextResponse.json(
                { message: "Product ID must be a number" },
                { status: 400 }
            );
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return NextResponse.json(
                { message: "Cart not found" },
                { status: 404 }
            );
        }

        cart.items = cart.items.filter(
            item => item.productId !== productIdNumber
        );

        await cart.save();
        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
} 