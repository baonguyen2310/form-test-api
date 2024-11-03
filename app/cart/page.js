'use client';
import { useState, useEffect } from 'react';

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const userId = "user123";

    // State cho form thêm sản phẩm
    const [newProduct, setNewProduct] = useState({
        productId: '',
        quantity: 1
    });
    const [addError, setAddError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/cart?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch cart');
            const data = await response.json();
            setCart(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        try {
            setUpdating(true);
            const response = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId, quantity: newQuantity })
            });
            
            if (!response.ok) throw new Error('Failed to update cart');
            await fetchCart();
        } catch (error) {
            setError(error.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            setUpdating(true);
            const response = await fetch('/api/cart', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId })
            });
            
            if (!response.ok) throw new Error('Failed to remove item');
            await fetchCart();
        } catch (error) {
            setError(error.message);
        } finally {
            setUpdating(false);
        }
    };

    // Thêm hàm xử lý thêm sản phẩm mới
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setAddError(null);

        // Validate input
        if (!newProduct.productId || !newProduct.quantity) {
            setAddError("Please fill in all fields");
            return;
        }

        if (newProduct.quantity < 1) {
            setAddError("Quantity must be at least 1");
            return;
        }

        try {
            setUpdating(true);
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    productId: Number(newProduct.productId),
                    quantity: Number(newProduct.quantity)
                })
            });

            if (!response.ok) throw new Error('Failed to add product');

            // Reset form
            setNewProduct({ productId: '', quantity: 1 });
            // Refresh cart
            await fetchCart();
        } catch (error) {
            setAddError(error.message);
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );

    if (error) return (
        <div className="container mx-auto p-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
                <button 
                    onClick={fetchCart}
                    className="mt-2 text-sm underline"
                >
                    Try again
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

            {/* Form thêm sản phẩm mới */}
            <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product ID
                            </label>
                            <input
                                type="number"
                                value={newProduct.productId}
                                onChange={(e) => setNewProduct(prev => ({
                                    ...prev,
                                    productId: e.target.value
                                }))}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter product ID"
                                disabled={updating}
                            />
                        </div>
                        <div className="w-32">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity
                            </label>
                            <input
                                type="number"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct(prev => ({
                                    ...prev,
                                    quantity: parseInt(e.target.value) || ''
                                }))}
                                min="1"
                                className="w-full px-3 py-2 border rounded-md"
                                disabled={updating}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                                disabled={updating}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    {addError && (
                        <p className="text-red-500 text-sm mt-2">{addError}</p>
                    )}
                </form>
            </div>

            {/* Loading và Error states */}
            {updating && (
                <div className="fixed top-0 right-0 m-4 bg-blue-100 text-blue-700 px-4 py-2 rounded">
                    Updating...
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                    <button 
                        onClick={fetchCart}
                        className="mt-2 text-sm underline"
                    >
                        Try again
                    </button>
                </div>
            ) : (
                /* Danh sách giỏ hàng */
                <div className="space-y-4">
                    {cart.items.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.items.map((item) => (
                            <div key={item.productId} className="flex items-center justify-between border p-4 rounded">
                                <div>
                                    <h3>Product ID: {item.productId}</h3>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button 
                                            onClick={() => handleUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                                            disabled={updating}
                                        >
                                            -
                                        </button>
                                        
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value);
                                                if (newQuantity > 0) {
                                                    handleUpdateQuantity(item.productId, newQuantity);
                                                }
                                            }}
                                            min="1"
                                            className="w-16 px-2 py-1 border rounded text-center"
                                            disabled={updating}
                                        />

                                        <button 
                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                                            disabled={updating}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => handleRemoveItem(item.productId)}
                                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                    disabled={updating}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}

                    {cart.items.length > 0 && (
                        <div className="mt-4 text-right">
                            <p className="text-xl font-bold">
                                Total Items: {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 