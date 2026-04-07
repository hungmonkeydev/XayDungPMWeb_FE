import React,{useState} from 'react';
import QuickViewModal from './QuickViewModal'
import { useNavigate } from 'react-router-dom';
import imgBoBanGhe1 from '../../assets/products/imgBoBanGhe1.png';


const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const imageSrc = product?.image || imgBoBanGhe1;
  // Hàm bổ trợ để định dạng tiền tệ (Ví dụ: 13600000 -> 13.600.000₫)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tính phần trăm giảm giá nếu có giá gốc
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
   <> {/* <--- Dùng Fragment bọc ngoài cùng vì giờ ta có 2 phần: Card và Modal */}
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">

        {/* 1. PHẦN ẢNH & TAG GIẢM GIÁ */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}

          <img
            src={imageSrc}
            alt={product?.name || 'Sản phẩm'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Nút xem nhanh/thêm giỏ hàng (Hiện khi hover chuột vào) */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
            <button 
              onClick={(e) => {
                navigate(`/san-pham/${product.id}`);
                e.stopPropagation();
                e.preventDefault();
              }}
              className="w-full bg-white text-gray-800 text-xs font-bold py-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
            >
              XEM CHI TIẾT
            </button>
          </div>
        </div>

        {/* 2. PHẦN NỘI DUNG (Tên & Giá) */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-gray-700 uppercase line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto flex justify-between items-end w-full">
            
            <div className="flex flex-col">
              
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-base">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[10px] text-gray-400 font-normal italic">Chưa gồm VAT</span>
              </div>

              {/* Giá gốc (Màu xám, gạch ngang) - Nằm ngay dưới giá hiện tại */}
              {product.originalPrice && (
                <div className="text-gray-400 text-xs line-through mt-0.5">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>

            <button 
              onClick={(e) => {
                console.log("Đã bấm nút mở Modal!"); // <--- Bắn dòng chữ này ra F12 để kiểm tra
                e.stopPropagation(); // Ngăn lỗi click xuyên thấu
                setIsModalOpen(true); // <--- 3. Bấm nút 4 ô vuông cũng mở Modal
              }}
              className="w-9 h-9 border border-amber-500 rounded-lg flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 bg-white shadow-sm mb-1 ml-2"
              title="Chọn sản phẩm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <--- 4. Gọi Modal ra ở đây. Nó chỉ hiện lên khi isModalOpen bằng true */}
      {isModalOpen && (
        <QuickViewModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;