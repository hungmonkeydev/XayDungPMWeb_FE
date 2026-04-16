import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Giả sử bạn lưu token đăng nhập ở localStorage (hoặc lấy từ Context)
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    // Chỉ lưu LocalStorage nếu CHƯA đăng nhập.
    // Nếu đã đăng nhập thì dữ liệu nằm trên DB rồi, không cần lưu Local nữa.
    if (!isLoggedIn) {
      localStorage.setItem('shopping_cart', JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);


  // --------------------------------------------------------
  // 🚀 HÀM MỚI: ĐỒNG BỘ GIỎ HÀNG (Gọi ngay sau khi User đăng nhập thành công)
  // --------------------------------------------------------
  const syncCartToAPI = async () => {
    // SỬA Ở ĐÂY: Đọc trực tiếp từ LocalStorage, không dùng biến state 'cart' nữa
    const savedCart = localStorage.getItem('shopping_cart');
    const localCartItems = savedCart ? JSON.parse(savedCart) : [];

    if (localCartItems.length === 0) return; // Nếu LocalStorage trống thì thôi

    try {
      // Chuẩn hóa định dạng mảng từ dữ liệu LocalStorage
      const formattedItems = localCartItems.map(item => ({
        productId: item.id || item.productId,
        productAttributeId: item.productAttributeId || item.attributeId || 1, // Bổ sung dòng này
        quantity: item.quantity
      }));

      // Gói mảng gửi lên API
      await axios.post('https://xaydungwebnoithat-backend.onrender.com/api/cart/sync', { items: formattedItems }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Đồng bộ thành công thì dọn dẹp LocalStorage
      localStorage.removeItem('shopping_cart');

      // Lúc này DB đã có hàng, gọi API kéo về đắp lên giao diện
      fetchCartFromAPI();
    } catch (error) {
      console.error("Lỗi đồng bộ giỏ hàng:", error);
    }
  };

  // Hàm lấy giỏ hàng từ API về (Dùng cho User đã login)
  const fetchCartFromAPI = async () => {
    try {
      const response = await axios.get('https://xaydungwebnoithat-backend.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Khui lớp hộp thứ nhất (của axios) và lớp thứ 2 (của Backend)
      const cartInfo = response.data.data; 

      // Nếu không có giỏ hàng thì set mảng rỗng
      if (!cartInfo) {
        setCart([]);
        return;
      }

      // Khui lớp hộp thứ 3: Vì bạn chưa bấm mở cái mũi tên ▶ ở chữ data ra, 
      // nên tui quét luôn 3 cái tên phổ biến nhất mà mấy ông BE hay xài (CartItems, cartItems, hoặc items)
      const itemsArray = cartInfo.CartItems || cartInfo.cartItems || cartInfo.items || [];
      
      setCart(itemsArray); // Đập mảng đồ lên giao diện!

    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
    }
  };
  // Load giỏ hàng từ API nếu user đang login và F5 lại trang
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartFromAPI();
    }
  }, [isLoggedIn]);


  // --------------------------------------------------------
  // CÁC HÀM XỬ LÝ CHÍNH (Đã nâng cấp)
  // --------------------------------------------------------

  // A. THÊM VÀO GIỎ (Add)
  const addToCart = async (product, quantity = 1) => {
    console.log("Toàn bộ cục dữ liệu SẢN PHẨM là:", product);
    if (isLoggedIn) {
      // 1. NẾU ĐÃ LOGIN -> GỌI API
      try {
        await axios.post('https://xaydungwebnoithat-backend.onrender.com/api/cart/add', {
          productId: product.id,
          productAttributeId: product.productAttributeId || product.attributeId || 1,
          quantity
        }, { headers: { Authorization: `Bearer ${token}` } });

        fetchCartFromAPI(); // Cập nhật lại state sau khi thêm
      } catch (error) {
        console.error("Lỗi thêm API:", error);
      }
    } else {
      // 2. NẾU CHƯA LOGIN -> LƯU LOCAL (Code cũ của bạn)
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
    }
  };

  // B. CẬP NHẬT SỐ LƯỢNG (Update)
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    if (isLoggedIn) {
      try {
        await axios.put(`https://xaydungwebnoithat-backend.onrender.com/api/cart/update/${productId}`, { quantity: newQuantity }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCartFromAPI();
      } catch (error) {
        console.error("Lỗi cập nhật API:", error);
      }
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // C. XÓA KHỎI GIỎ (Remove)
  const removeFromCart = async (productId) => {
    if (isLoggedIn) {
      try {
        await axios.delete(`https://xaydungwebnoithat-backend.onrender.com/api/cart/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCartFromAPI();
      } catch (error) {
        console.error("Lỗi xóa API:", error);
      }
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }
  };

  // D. XÓA SẠCH GIỎ HÀNG (Clear)
  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await axios.delete('https://xaydungwebnoithat-backend.onrender.com/api/cart/clear', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart([]);
      } catch (error) {
        console.error("Lỗi clear API:", error);
      }
    } else {
      setCart([]);
    }
  };

  const totalItems = (cart || []).reduce((total, item) => total + item.quantity, 0);
  const totalPrice = (cart || []).reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    syncCartToAPI, // <-- Trả ra hàm này để gọi lúc Login
    totalItems,
    totalPrice,
  };
}