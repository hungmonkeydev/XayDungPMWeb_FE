import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button'; 
import imgBoBanGhe1 from '../../assets/products/imgBoBanGhe1.png';

const QuickViewModal = ({ product, onClose }) => {
    const navigate = useNavigate(); 
    const [quantity, setQuantity] = useState(1);
    const [selectedMaterial, setSelectedMaterial] = useState('Da công nghiệp');
    const [selectedSize, setSelectedSize] = useState('Văng (2100*900*920)mm');

    // 1. LẤY DỮ LIỆU CHUẨN TỪ API (Giống hệt cách làm ở ProductCard)
    const currentPrice = product?.ProductAttributes?.[0]?.price || 0;
    const originalPrice = product?.originalPrice || (parseFloat(currentPrice) * 1.2); 
    
    const imageSrc = (product?.ProductImages && product.ProductImages.length > 0)
        ? product.ProductImages[0].imageUrl 
        : imgBoBanGhe1;

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericPrice || 0);
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Tính phần trăm giảm giá an toàn
    const discount = (originalPrice && currentPrice)
        ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
        : 0;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={handleBackgroundClick}
        >
            <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">

                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-amber-500 text-white w-8 h-8 flex items-center justify-center hover:bg-amber-600 rounded-bl-lg z-10 transition-colors"
                >
                    ✕
                </button>

                {/* --- CỘT TRÁI: ẢNH --- */}
                <div className="w-full md:w-1/2 bg-gray-50 p-6 flex items-center justify-center relative">
                    <img
                        src={imageSrc} // Dùng biến imageSrc lấy từ API
                        alt={product?.name}
                        className="w-full h-auto object-contain max-h-[500px]"
                        onError={(e) => { e.target.src = imgBoBanGhe1; }}
                    />
                </div>

                {/* --- CỘT PHẢI: CHI TIẾT --- */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">

                    <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4 pb-4 border-b border-gray-200">
                        {product?.name}
                    </h2>

                    {/* Tạm thời giữ nguyên Vật Liệu và Kích Thước (Nếu muốn lấy thật thì phải map qua mảng ProductAttributes) */}
                    <div className="mb-5">
                        <h4 className="font-semibold text-gray-800 mb-2">Vật liệu</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Da công nghiệp', 'Microfiber', 'Carola', 'Da bò Italia'].map(mat => (
                                <button
                                    key={mat}
                                    onClick={() => setSelectedMaterial(mat)}
                                    className={`px-4 py-2 text-sm border rounded-md transition-all duration-200 ${selectedMaterial === mat
                                        ? 'border-amber-500 text-amber-600 font-semibold shadow-sm'
                                        : 'border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-500'
                                        }`}
                                >
                                    {mat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-2">Kích thước</h4>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedSize('Văng (2100*900*920)mm')}
                                className={`px-4 py-2 text-sm border rounded-md transition-all duration-200 ${selectedSize === 'Văng (2100*900*920)mm'
                                    ? 'border-amber-500 text-amber-600 font-semibold shadow-sm'
                                    : 'border-gray-300 text-gray-600 hover:border-amber-500'
                                    }`}
                            >
                                Văng (2100*900*920)mm
                            </button>
                        </div>
                    </div>

                    {/* GIÁ TIỀN (Đã sửa lại gọi đúng biến) */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-bold text-amber-500">{formatPrice(currentPrice)}</span>
                        {originalPrice > currentPrice && (
                            <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
                        )}
                        {discount > 0 && (
                            <span className="bg-[#992300] text-white text-[11px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                                -{discount}%
                            </span>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="secondary"
                                className="!w-9 !h-9 !p-0 rounded-full bg-white border border-gray-300 text-xl text-gray-600 hover:text-red-600 hover:border-red-600"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >
                                -
                            </Button>
                            <span className="w-6 text-center font-bold text-gray-800">{quantity}</span>
                            <Button
                                variant="secondary"
                                className="!w-9 !h-9 !p-0 rounded-full bg-white border border-gray-300 text-xl text-gray-600 hover:text-red-600 hover:border-red-600"
                                onClick={() => setQuantity(q => q + 1)}
                            >
                                +
                            </Button>
                        </div>

                        <Button
                            variant="danger"
                            size="lg"
                            className="flex-1 uppercase shadow-md bg-[#b32b00] hover:bg-[#992300]"
                            onClick={() => {
                                onClose();
                                navigate('/gio-hang');
                                window.scrollTo(0, 0);
                            }}
                        >
                            Thêm vào giỏ
                        </Button>
                    </div>

                    {/* MÔ TẢ THẬT TỪ API */}
                    <div className="text-sm text-gray-500 mt-auto leading-relaxed border-t border-gray-100 pt-4">
                        <p className="line-clamp-3 text-justify">
                            <strong>Mã sản phẩm:</strong> #{product?.id} <br/>
                            {product?.description || "Sản phẩm hiện chưa có mô tả chi tiết."}
                        </p>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/san-pham/${product?.id}`);
                                onClose();
                            }}
                            className="text-amber-500 font-semibold mt-2 inline-block hover:underline"
                        >
                            Chi tiết sản phẩm
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;