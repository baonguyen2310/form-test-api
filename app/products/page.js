'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        const response = await fetch(`/api/products?page=${page}`);
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Sản phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md flex">
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
                ))}
            </div>
            <div className="flex justify-between items-center mt-6">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}
