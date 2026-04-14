import { useState, useEffect } from 'react';

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);

  // A. THÊM VÀO GIỎ (Add)
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Nếu có rồi thì chỉ tăng số lượng
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Nếu chưa có thì thêm mới nguyên cả object sản phẩm + số lượng
      return [...prevCart, { ...product, quantity }];
    });
  };

  // B. CẬP NHẬT SỐ LƯỢNG (Update)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng âm hoặc bằng 0

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // C. XÓA KHỎI GIỎ (Remove)
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // D. XÓA SẠCH GIỎ HÀNG (Clear) - Dùng khi thanh toán xong
  const clearCart = () => {
    setCart([]);
  };

  
  // Tổng số lượng món hàng (để hiện lên icon giỏ hàng trên Header)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Tổng tiền (Lưu ý: Bạn phải đảm bảo object product truyền vào có trường `price`)
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };
}