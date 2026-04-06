import React from 'react';

const ProductCard = ({ product }) => {
  // Hàm bổ trợ để định dạng tiền tệ (Ví dụ: 13600000 -> 13.600.000₫)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tính phần trăm giảm giá nếu có giá gốc
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">

      {/* 1. PHẦN ẢNH & TAG GIẢM GIÁ */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {/* Tag giảm giá màu vàng (chỉ hiện khi có giảm giá) */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Nút xem nhanh/thêm giỏ hàng (Hiện khi hover chuột vào) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
          <button className="w-full bg-white text-gray-800 text-xs font-bold py-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
            XEM CHI TIẾT
          </button>
        </div>
      </div>

      {/* 2. PHẦN NỘI DUNG (Tên & Giá) */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-700 uppercase line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto">
          {/* Giá bán hiện tại (Màu đỏ) */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-base">
              {formatPrice(product.price)}
            </span>
            <span className="text-[10px] text-gray-400 font-normal italic">Chưa gồm VAT</span>
          </div>

          {/* Giá gốc (Màu xám, gạch ngang) */}
          {product.originalPrice && (
            <div className="text-gray-400 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;