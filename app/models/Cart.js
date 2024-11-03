import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: Number,  // Chỉ dùng Number, không ref
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [CartItemSchema]  // Sử dụng CartItemSchema
}, {
    timestamps: true
});

// Xóa model cũ nếu tồn tại để tránh lỗi
mongoose.models = {};

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;