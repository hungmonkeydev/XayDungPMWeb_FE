import React from 'react';
import Button from '../ui/Button';

// Nhận biến subtotal từ CartPage truyền vào
const CartSummary = ({ subtotal }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 sticky top-24">
            
            <div className="border-b border-red-500 pb-2 mb-4">
                <p className="text-sm font-bold text-gray-800 uppercase">
                    TỔNG TIỀN
                </p>
            </div>

            {/* Hiển thị tổng tiền động */}
            <p className="font-black text-4xl text-red-600">
                {subtotal?.toLocaleString('vi-VN')}₫
            </p>

            <Button variant="danger" className="w-full !bg-[#b32b00] !text-white !font-bold py-3 hover:!bg-[#992300]">
                THANH TOÁN NGAY
            </Button>
        </div>
    );
};

export default CartSummary;