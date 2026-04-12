import React, { useState, useEffect } from 'react';
import useProducts from '../../hooks/useProducts'; 
import ProductCard from '../../components/product/ProductCard';
import { useSearchParams } from 'react-router-dom'; 

const ProductListPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchParams] = useSearchParams();
    const targetCategoryId = Number(searchParams.get('categoryId'));

    const [filter, setFilter] = useState({
        minPrice: 0,
        maxPrice: 999999999, 
        category: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    // 1. CHỈ GỌI API ĐƠN GIẢN ĐỂ LẤY HÀNG VỀ (Bỏ cái filter đi, thay bằng limit)
    const { products, loading, error } = useProducts({ limit: 50 });

    // 2. TỰ XỬ LÝ MỌI BỘ LỌC Ở FRONTEND
    const getProcessedProducts = () => {
        let result = products || [];

        // Lọc theo phòng (từ trang chủ bấm sang)
        if (targetCategoryId) {
            result = result.filter(p => p.categoryId === targetCategoryId);
        }

        // Lọc theo Loại (Sofa da, Sofa Italia...) - Tạm check theo tên sản phẩm
        if (filter.category) {
            result = result.filter(p => p.name?.toUpperCase().includes(filter.category));
        }

        // Lọc theo Giá (Nhớ bóc hộp lấy giá thật)
        result = result.filter(p => {
            const currentPrice = parseFloat(p.ProductAttributes?.[0]?.price || 0);
            return currentPrice >= filter.minPrice && currentPrice <= filter.maxPrice;
        });

        // Sắp xếp
        result.sort((a, b) => {
            const priceA = parseFloat(a.ProductAttributes?.[0]?.price || 0);
            const priceB = parseFloat(b.ProductAttributes?.[0]?.price || 0);
            
            if (filter.sortBy === 'price') {
                return filter.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            }
            return 0; 
        });

        return result;
    };

    const displayProducts = getProcessedProducts();

    const handleFilterChange = (newFilter) => {
        setFilter({ ...filter, ...newFilter });
    };

    const sortOptions = [
        { label: 'Mặc định', value: 'createdAt', order: 'desc' },
        { label: 'Giá tăng dần', value: 'price', order: 'asc' },
        { label: 'Giá giảm dần', value: 'price', order: 'desc' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-100 uppercase">
                {targetCategoryId ? "Sản phẩm theo danh mục" : "Tất cả sản phẩm"}
            </h1>

            {/* BỘ LỌC */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">
                <div>
                    <h3 className="font-bold text-amber-500 mb-3 border-b border-amber-200 pb-1">Lọc giá</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="price" onChange={() => handleFilterChange({ minPrice: 0, maxPrice: 999999999 })} defaultChecked /> 
                            Tất cả mức giá
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="price" onChange={() => handleFilterChange({ minPrice: 0, maxPrice: 20000000 })} /> 
                            Dưới 20.000.000đ
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="price" onChange={() => handleFilterChange({ minPrice: 20000000, maxPrice: 40000000 })} /> 
                            20tr - 40tr
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="price" onChange={() => handleFilterChange({ minPrice: 40000000, maxPrice: 999999999 })} /> 
                            Trên 40tr
                        </label>
                    </div>
                </div>

                {/* Loại */}
                <div>
                    <h3 className="font-bold text-amber-500 mb-3 border-b border-amber-200 pb-1">Loại</h3>
                    <div className="flex flex-wrap gap-2">
                        {/* Nút reset loại */}
                        <button
                            onClick={() => handleFilterChange({ category: '' })}
                            className={`px-4 py-1.5 border rounded-full text-sm transition ${
                                filter.category === '' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 hover:border-amber-500'
                            }`}
                        >
                            Tất cả
                        </button>
                        {['SOFA', 'BÀN ĂN', 'GIƯỜNG'].map(type => (
                            <button
                                key={type}
                                onClick={() => handleFilterChange({ category: type })}
                                className={`px-4 py-1.5 border rounded-full text-sm transition ${
                                    filter.category === type ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 hover:border-amber-500'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* SẮP XẾP */}
            <div className="flex gap-6 mb-6 border-b border-gray-200 pb-2">
                {sortOptions.map(option => (
                    <button
                        key={option.label}
                        onClick={() => handleFilterChange({ sortBy: option.value, sortOrder: option.order })}
                        className={`text-sm font-medium pb-2 transition-all ${
                            (filter.sortBy === option.value && filter.sortOrder === option.order) 
                            ? 'text-amber-500 border-b-2 border-amber-500' 
                            : 'text-gray-500 hover:text-amber-500'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            {loading ? (
                <div className="text-center py-20 font-medium text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
                <div className="text-center py-20 text-red-500">{error}</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayProducts.length > 0 ? (
                        displayProducts.map(p => <ProductCard key={p.id} product={p} />)
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p className="text-lg">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
                            <button onClick={() => setFilter({ minPrice: 0, maxPrice: 999999999, category: '', sortBy: 'createdAt', sortOrder: 'desc' })} className="mt-4 text-amber-500 hover:underline">
                                Xóa bộ lọc
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductListPage;