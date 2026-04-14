import React from 'react';
import EmptyCart from '../../components/cart/EmptyCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import useCart from '../../hooks/useCart'; 

const CartPage = () => {
    // Lấy dữ liệu từ hook
    const { cart, clearCart, totalPrice, updateQuantity, removeFromCart } = useCart();

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-12">
            <div className="max-w-7xl mx-auto px-4 pt-4">
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white p-3 rounded-md shadow-sm">
                    <span className="text-amber-500 font-medium cursor-pointer hover:underline">🏠 Trang chủ</span>
                    <span>›</span>
                    <span className="text-gray-800">Giỏ hàng</span>
                </div>

                {/* Đã đổi cartItems thành cart */}
                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                            <button 
                                onClick={clearCart} 
                                className="text-red-600 text-sm font-medium hover:underline mb-6 inline-block"
                            >
                                Xoá tất cả
                            </button>

                            <div className="space-y-6 border border-gray-100 p-6 rounded-lg">
                                {/* Đã đổi cartItems thành cart */}
                                {cart.map(item => (
                                    <CartItem 
                                        key={item.id} 
                                        item={item} 
                                        updateQuantity={updateQuantity}
                                        removeFromCart={removeFromCart}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-96 shrink-0">
                            {/* Chuyền totalPrice từ hook vào đây */}
                            <CartSummary subtotal={totalPrice} /> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;