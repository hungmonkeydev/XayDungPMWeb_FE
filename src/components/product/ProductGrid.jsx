import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products }) => {
    return (
        <div className="container mx-auto py-4 px-4">
            {/* Tiêu đề phần (Ví dụ: Phòng Khách) */}
            <div className="flex justify-between items-center mb-8 border-b-2 border-amber-500 pb-2">
                <h2 className="bg-amber-500 text-white px-4 py-2 rounded-t-lg font-bold uppercase">
                    {title}
                </h2>
                <a href="#" className="text-gray-500 text-sm hover:text-amber-500 transition-colors">Xem tất cả &gt;</a>
            </div>

            {/* Lưới sản phẩm: Mobile 2 cột, Laptop 4 cột */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.slice(0, 4).map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;