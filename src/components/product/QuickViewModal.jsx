// src/components/product/QuickViewModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm import này
import Button from '../ui/Button'; // <-- Thay đổi đường dẫn này nếu cần

const QuickViewModal = ({ product, onClose }) => {
    const navigate = useNavigate(); // Thêm hook này
    const [quantity, setQuantity] = useState(1);
    const [selectedMaterial, setSelectedMaterial] = useState('Da công nghiệp');
    const [selectedSize, setSelectedSize] = useState('Văng (2100*900*920)mm');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Tính phần trăm giảm giá để hiện thẻ -...%
    const discount = product?.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={handleBackgroundClick}
        >
            <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">

                {/* Nút X Đóng Modal */}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-amber-500 text-white w-8 h-8 flex items-center justify-center hover:bg-amber-600 rounded-bl-lg z-10 transition-colors"
                >
                    ✕
                </button>

                {/* --- CỘT TRÁI: ẢNH --- */}
                <div className="w-full md:w-1/2 bg-gray-50 p-6 flex items-center justify-center relative">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-auto object-contain max-h-[500px]"
                    />
                </div>

                {/* --- CỘT PHẢI: CHI TIẾT --- */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">

                    <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4 pb-4 border-b border-gray-200">
                        {product?.name}
                    </h2>

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

                    {/* Giá tiền */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-bold text-amber-500">{formatPrice(product?.price || 0)}</span>
                        {product?.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                        {discount > 0 && (
                            <span className="bg-[#992300] text-white text-[11px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                                -{discount}%
                            </span>
                        )}
                    </div>

                    {/* --- KHU VỰC SỬ DỤNG COMPONENT BUTTON CỦA BẠN --- */}
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
                                // 1. Tắt cái Modal Quick View này đi
                                onClose();

                                // 2. Chuyển cái vèo sang trang Giỏ hàng
                                navigate('/gio-hang');
                                window.scrollTo(0, 0);
                            }}
                        >
                            Thêm vào giỏ
                        </Button>

                    </div>

                    <div className="text-sm text-gray-500 mt-auto leading-relaxed border-t border-gray-100 pt-4">
                        <p className="line-clamp-3">
                            Mã sản phẩm: {product?.id || 'LUSF09'}. {product?.name} chất lượng cao cấp, thiết kế hiện đại sang trọng, phù hợp với mọi không gian nội thất...
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