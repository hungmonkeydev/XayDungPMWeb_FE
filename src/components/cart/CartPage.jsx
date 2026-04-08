import React, { useState } from 'react';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
// Nếu bạn có ảnh thật, hãy import nó ở đây:
import img1 from '../../assets/products/imgBoBanGhe1.png'; 

const CartPage = () => {
    // HARDCODE DỮ LIỆU: Cho sẵn 1 sản phẩm vào giỏ hàng để test giao diện
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Bàn ăn inox tráng gương mặt đá Irene (không gồm ghế)',
            size: '1400*800mm',
            material: 'Đá tinh thể',
            price: 7600000,
            quantity: 1,
            image: img1 // Dùng ảnh thật nếu có, nếu không thì dùng placeholder
        }
    ]);

    // Tính tổng tiền dựa trên mảng cartItems (Tự động tính)
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-12">
            <div className="max-w-7xl mx-auto px-4 pt-4">
                
                {/* 1. BREADCRUMB */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white p-3 rounded-md shadow-sm">
                    <span className="text-amber-500 font-medium cursor-pointer hover:underline">🏠 Trang chủ</span>
                    <span>›</span>
                    <span className="text-gray-800">Giỏ hàng</span>
                </div>

                {/* 2. CHIA NHÁNH HIỂN THỊ */}
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* CỘT TRÁI: Danh sách sản phẩm */}
                        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                            
                            <button className="text-red-600 text-sm font-medium hover:underline mb-6 inline-block">
                                Xoá tất cả
                            </button>

                            <div className="space-y-6 border border-gray-100 p-6 rounded-lg">
                                {/* Lặp qua mảng và truyền dữ liệu xuống CartItem */}
                                {cartItems.map(item => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* CỘT PHẢI: Sidebar Tổng tiền */}
                        <div className="w-full lg:w-96 shrink-0">
                            {/* Truyền tổng tiền xuống CartSummary */}
                            <CartSummary subtotal={subtotal} /> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;