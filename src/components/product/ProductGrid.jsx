import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// LỖI DO THIẾU CHỮ categoryId Ở DÒNG NÀY NÈ HƯNG:
const ProductGrid = ({ title, products, categoryId }) => { 
    return (
        <div className="container mx-auto py-4 px-4">
            <div className="flex justify-between items-center mb-8 border-b-2 border-amber-500 pb-2">
                <h2 className="bg-amber-500 text-white px-4 py-2 rounded-t-lg font-bold uppercase">
                    {title}
                </h2>
                
                {categoryId ? (
                    <Link 
                        to={`/products?categoryId=${categoryId}`} 
                        className="text-gray-500 text-sm hover:text-amber-500 transition-colors"
                    >
                        Xem tất cả &gt;
                    </Link>
                ) : (
                    <Link 
                        to="/products" 
                        className="text-gray-500 text-sm hover:text-amber-500 transition-colors"
                    >
                        Xem tất cả &gt;
                    </Link>
                )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.slice(0, 8).map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;