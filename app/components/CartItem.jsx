'use client';
import { useState } from 'react';

export default function CartItem({ item, userId }) {
    const [quantity, setQuantity] = useState(item.quantity);

    // Cập nhật số lượng
    const handleUpdateQuantity = async (newQuantity) => {
        try {
            const response = await fetch('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    productId: item.productId,
                    quantity: newQuantity
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update cart');
            }
            
            setQuantity(newQuantity);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // Xóa sản phẩm
    const handleRemoveItem = async () => {
        try {
            const response = await fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    productId: item.productId
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to remove item');
            }
            
            // Có thể gọi callback để cập nhật UI
            onRemove && onRemove(item.productId);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div className="cart-item">
            <p>Product ID: {item.productId}</p>
            <input 
                type="number" 
                value={quantity}
                min="1"
                onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
            />
            <button onClick={handleRemoveItem}>Remove</button>
        </div>
    );
} 