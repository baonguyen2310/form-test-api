'use client';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';

export default function Cart({ userId }) {
    const [cart, setCart] = useState(null);

    // Lấy giỏ hàng
    const fetchCart = async () => {
        try {
            const response = await fetch(`/api/cart?userId=${userId}`);
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    // Callback khi xóa item
    const handleRemoveItem = (productId) => {
        setCart(prev => ({
            ...prev,
            items: prev.items.filter(item => item.productId !== productId)
        }));
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.items.map(item => (
                <CartItem 
                    key={item.productId}
                    item={item}
                    userId={userId}
                    onRemove={handleRemoveItem}
                />
            ))}
        </div>
    );
} 