'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    
    // Giả sử userId được lấy từ authentication
    const userId = "user123";

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        try {
            const response = await fetch(`/api/products?page=${page}`);
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Thêm hàm addToCart
    const addToCart = async (productId) => {
        try {
            setLoading(true);
            setError(null);
            
            const quantity = quantities[productId] || 1; // Lấy số lượng từ state, mặc định là 1
            
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    quantity: Number(quantity)
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            // Reset quantity sau khi thêm thành công
            setQuantities(prev => ({
                ...prev,
                [productId]: 1
            }));
            
            alert('Thêm vào giỏ hàng thành công!');
            
        } catch (err) {
            setError(err.message);
            alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý thay đổi số lượng
    const handleQuantityChange = (productId, value) => {
        const newQuantity = parseInt(value);
        if (newQuantity > 0) {
            setQuantities(prev => ({
                ...prev,
                [productId]: newQuantity
            }));
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Sản phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md">
                        <div className="flex mb-4">
                            <div className="w-[100px] h-[100px] relative mr-4">
                                <Image 
                                    src={product.imgurl} 
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                    className="rounded-md"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 text-sm">Giá: {product.price.toLocaleString()} VND</p>
                                <p className="text-gray-600 text-sm">Danh mục: {product.category}</p>
                                <p className="text-gray-600 text-sm">Đánh giá: {product.rating}/5</p>
                            </div>
                        </div>
                        
                        {/* Thêm phần số lượng và nút Add to Cart */}
                        <div className="flex items-center gap-2 mt-2 mb-2">
                            <div className="flex items-center border rounded-md">
                                <button 
                                    onClick={() => handleQuantityChange(
                                        product.id, 
                                        Math.max(1, (quantities[product.id] || 1) - 1)
                                    )}
                                    className="px-3 py-1 hover:bg-gray-100"
                                    disabled={loading}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    className="w-16 text-center border-x py-1"
                                    disabled={loading}
                                />
                                <button 
                                    onClick={() => handleQuantityChange(
                                        product.id, 
                                        (quantities[product.id] || 1) + 1
                                    )}
                                    className="px-3 py-1 hover:bg-gray-100"
                                    disabled={loading}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => addToCart(product.id)}
                                disabled={loading}
                                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-6">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}
