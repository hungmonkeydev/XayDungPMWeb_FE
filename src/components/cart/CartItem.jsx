import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => { 
    return (
        <div className="flex gap-4 p-4 border border-gray-100 rounded-lg relative group transition-all hover:shadow-md">
            
            {/* Nút xóa sản phẩm */}
            <button 
            onClick={() => removeFromCart(item.id)}
            className="absolute -top-3 -right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-700 transition opacity-0 group-hover:opacity-100">
                ×
            </button>

            {/* CỘT 1: ẢNH (Đã sửa để lấy đúng link ảnh từ Backend) */}
            <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-2">
                <img 
                    src={item.Product?.ProductImages?.[0]?.imageUrl || 'https://placehold.co/150x150?text=No+Image'} 
                    alt={item.Product?.name || 'Sản phẩm'} 
                    className="w-full h-full object-contain mix-blend-multiply" 
                />
            </div>

            {/* CỘT 2: THÔNG TIN (Đã sửa tên và thuộc tính) */}
            <div className="flex-1 space-y-2">
                <p className="font-bold text-gray-800 text-sm leading-snug">
                    {item.Product?.name || 'Đang tải...'}
                </p>
                <p className="text-gray-500 text-xs">
                    {/* Ông BE đã nối sẵn chuỗi Màu + Size, nên mình gọi đúng 1 biến này thôi */}
                    {item.ProductAttribute?.name || 'Mặc định'}
                </p>
            </div>

            {/* CỘT 3: TĂNG GIẢM & GIÁ */}
            <div className="flex flex-col items-end gap-3 justify-between h-full pt-1">
                
                <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1.5 py-1">
                    <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center text-red-600 font-black hover:bg-red-100 transition">
                        −
                    </button>
                    <span className="font-bold text-gray-800 text-sm w-5 text-center">
                        {item.quantity}
                    </span>
                    <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center text-red-600 font-black hover:bg-red-100 transition">
                        +
                    </button>
                </div>

                <p className="font-bold text-xl text-gray-800">
                    {/* Đã bọc parseFloat để chống lỗi khi Backend trả về string */}
                    {(parseFloat(item.price || 0) * item.quantity).toLocaleString('vi-VN')}₫
                </p>
            </div>
        </div>
    );
};

export default CartItem;