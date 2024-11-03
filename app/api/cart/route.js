import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Cart from "../../models/Cart";

// #swagger.start
/* 
#swagger.path = '/cart'
#swagger.method = 'get'
#swagger.tags = ['Cart']
#swagger.description = 'Get user cart'
#swagger.parameters['userId'] = {
    in: 'query',
    description: 'User ID to fetch cart for',
    required: true,
    type: 'string'
}
#swagger.responses[200] = {
    description: 'Cart retrieved successfully',
    schema: { $ref: '#/components/schemas/Cart' }
}
#swagger.responses[400] = {
    description: 'User ID is required'
}
#swagger.responses[500] = {
    description: 'Server error'
}
*/
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
// #swagger.end

// #swagger.start
/* 
#swagger.path = '/cart'
#swagger.method = 'post'
#swagger.tags = ['Cart']
#swagger.description = 'Add product to cart'
#swagger.requestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['userId', 'productId', 'quantity'],
                properties: {
                    userId: {
                        type: 'string',
                        description: 'User ID who owns the cart'
                    },
                    productId: {
                        type: 'number',
                        description: 'ID of product to add'
                    },
                    quantity: {
                        type: 'number',
                        description: 'Quantity of product to add'
                    }
                }
            }
        }
    }
}
#swagger.responses[200] = {
    description: 'Product added successfully',
    schema: { $ref: '#/components/schemas/Cart' }
}
*/
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
// #swagger.end

// #swagger.start
/* 
#swagger.path = '/cart'
#swagger.method = 'put'
#swagger.tags = ['Cart']
#swagger.description = 'Update product quantity in cart'
#swagger.requestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['userId', 'productId', 'quantity'],
                properties: {
                    userId: {
                        type: 'string',
                        description: 'User ID who owns the cart'
                    },
                    productId: {
                        type: 'number',
                        description: 'ID of product to update'
                    },
                    quantity: {
                        type: 'number',
                        description: 'New quantity for the product'
                    }
                }
            }
        }
    }
}
#swagger.responses[200] = {
    description: 'Cart updated successfully',
    schema: { $ref: '#/components/schemas/Cart' }
}
*/
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
// #swagger.end

// #swagger.start
/* 
#swagger.path = '/cart'
#swagger.method = 'delete'
#swagger.tags = ['Cart']
#swagger.description = 'Remove product from cart'
#swagger.requestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['userId', 'productId'],
                properties: {
                    userId: {
                        type: 'string',
                        description: 'User ID who owns the cart'
                    },
                    productId: {
                        type: 'number',
                        description: 'ID of product to remove'
                    }
                }
            }
        }
    }
}
#swagger.responses[200] = {
    description: 'Product removed successfully',
    schema: { $ref: '#/components/schemas/Cart' }
}
#swagger.responses[400] = {
    description: 'Missing required fields or invalid product ID'
}
#swagger.responses[404] = {
    description: 'Cart not found'
}
#swagger.responses[500] = {
    description: 'Server error'
}
*/
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
// #swagger.end 