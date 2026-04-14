import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductDetail from '../../hooks/useProductDetail';
import imgBoBanGhe1 from '../../assets/products/imgBoBanGhe1.png';
import useCart from '../../hooks/useCart';
const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useProductDetail(id);
    const { addToCart } = useCart();
    // --- BÍ KÍP TRỊ LỖI BÓC HỘP (XỬ LÝ DỮ LIỆU BỊ LỒNG) ---
    let realProduct = product;
    if (product?.data) {
        realProduct = Array.isArray(product.data) ? product.data[0] : product.data;
    } else if (Array.isArray(product)) {
        realProduct = product[0];
    }

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    
    // THÊM STATE SỐ LƯỢNG Ở ĐÂY
    const [quantity, setQuantity] = useState(1);

    if (loading) return <div className="p-20 text-center text-lg text-gray-500">Đang tải thông tin sản phẩm...</div>;
    if (error) return <div className="p-20 text-center text-red-500">{error}</div>;
    if (!realProduct || Object.keys(realProduct).length === 0) return <div className="p-20 text-center">Không tìm thấy sản phẩm</div>;

    const images = realProduct.ProductImages || [];
    const currentImage = images[activeImageIndex]?.imageUrl || imgBoBanGhe1;

    const variants = realProduct.ProductAttributes || [];
    const currentVariant = variants[selectedVariantIndex] || variants[0]; 

    // TÍNH TỔNG TIỀN = GIÁ PHIÊN BẢN x SỐ LƯỢNG
    const unitPrice = parseFloat(currentVariant?.price || 0);
    const totalPrice = unitPrice * quantity;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    const handleAddToCart = () => {
        // Đóng gói dữ liệu sản phẩm CHUẨN với format mà CartItem đang cần
        const productToAdd = {
            id: currentVariant?.id || realProduct.id, // Dùng id của variant nếu có, không thì dùng id sản phẩm
            name: realProduct.name,
            price: unitPrice, // Giá của 1 sản phẩm
            image: currentImage,
            // Thêm các trường phụ để hiện ở giỏ hàng (CartItem của bạn đang có 2 trường này)
            size: currentVariant?.Dimension?.name || 'Mặc định', 
            material: currentVariant?.Color?.name || 'Mặc định' 
        };

        // Bỏ vào giỏ với số lượng khách đang chọn
        addToCart(productToAdd, quantity);

        // Hiển thị thông báo (Bạn có thể dùng Toast thư viện thay cho alert cho đẹp)
        alert('Đã thêm sản phẩm vào giỏ hàng!');

        // (Tuỳ chọn) Chuyển hướng thẳng sang trang giỏ hàng
        // navigate('/gio-hang'); 
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-10">
                
                {/* --- BÊN TRÁI: HÌNH ẢNH --- */}
                <div className="md:w-1/2 flex flex-col gap-4">
                    <div className="w-full aspect-square bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center">
                        <img 
                            src={currentImage} 
                            alt={realProduct.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = imgBoBanGhe1; }} 
                        />
                    </div>
                    
                    {images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {images.map((img, index) => (
                                <button 
                                    key={img.id}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`w-24 h-24 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                                        activeImageIndex === index ? 'border-amber-500 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img.imageUrl} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- BÊN PHẢI: THÔNG TIN --- */}
                <div className="md:w-1/2 flex flex-col">
                    <span className="text-sm text-amber-600 font-bold tracking-wider uppercase mb-2">
                        {realProduct.Category?.name || 'Nội thất'}
                    </span>
                    <h1 className="text-3xl font-bold mb-4 uppercase text-gray-800">{realProduct.name}</h1>
                    
                    {/* HIỂN THỊ TỔNG TIỀN ĐÃ ĐƯỢC NHÂN VỚI SỐ LƯỢNG */}
                    <div className="mb-6 flex items-end gap-3">
                        <p className="text-4xl text-red-600 font-bold">
                            {formatPrice(totalPrice)}
                        </p>
                        {quantity > 1 && (
                            <p className="text-sm text-gray-500 mb-1">
                                ({formatPrice(unitPrice)} / sản phẩm)
                            </p>
                        )}
                    </div>
                    
                    <div className="border-t border-b border-gray-100 py-6 mb-6 space-y-6">
                        
                        {variants.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Tùy chọn Phiên bản:</h3>
                                <div className="flex flex-col gap-3">
                                    {variants.map((variant, index) => (
                                        <label 
                                            key={variant.id} 
                                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                                                selectedVariantIndex === index 
                                                ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' 
                                                : 'border-gray-200 hover:border-amber-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="variant" 
                                                    checked={selectedVariantIndex === index}
                                                    onChange={() => setSelectedVariantIndex(index)}
                                                    className="w-4 h-4 text-amber-500"
                                                />
                                                <span className="font-medium text-gray-700">
                                                    Màu {variant.Color?.name || 'Mặc định'} - Size {variant.Dimension?.name || 'Mặc định'}
                                                </span>
                                            </div>
                                            <span className="text-gray-500 font-medium">
                                                {formatPrice(variant.price)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- KHU VỰC CHỌN SỐ LƯỢNG Y NHƯ TRONG ẢNH --- */}
                        <div className="flex items-center gap-6">
                            <h3 className="font-semibold text-gray-800">Số lượng:</h3>
                            <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-200 rounded-l-md transition-colors"
                                >
                                    −
                                </button>
                                <div className="w-12 h-10 flex items-center justify-center bg-white border-x border-gray-300 font-semibold text-lg">
                                    {quantity}
                                </div>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-200 rounded-r-md transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">
                                (Còn {currentVariant?.stock || 0} sản phẩm)
                            </span>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-2">Mô tả sản phẩm:</h3>
                            <p className="text-gray-600 text-justify leading-relaxed">
                                {realProduct.description || 'Chưa có mô tả cho sản phẩm này.'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-4 flex gap-4">
                        <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition shadow-lg shadow-amber-500/30">
                            THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;