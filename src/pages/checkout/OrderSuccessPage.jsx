import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { useAuth } from "../../hooks/useAuth";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + "đ";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

export default function OrderSuccessPage() {
  const { user }                        = useAuth();
  const { newOrder, handleClearNewOrder } = useOrders();
  const navigate                        = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    // Nếu không có đơn hàng mới → redirect về trang chủ
    if (!newOrder) navigate("/");
  }, [user, newOrder]);

  // Dọn dẹp state khi rời trang
  useEffect(() => {
    return () => handleClearNewOrder();
  }, []);

  if (!newOrder) return null;

  const total = newOrder.items?.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  ) || newOrder.total || 0;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4">

        {/* ICON THÀNH CÔNG */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-500 text-sm">
            Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận sớm nhất.
          </p>
        </div>

        {/* THÔNG TIN ĐƠN HÀNG */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
            Thông tin đơn hàng
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Mã đơn hàng</span>
              <span className="font-semibold text-amber-500">
                #{newOrder.trackingNumber || newOrder.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Ngày đặt</span>
              <span className="text-gray-800">
                {newOrder.createdAt ? formatDate(newOrder.createdAt) : formatDate(new Date())}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phương thức thanh toán</span>
              <span className="text-gray-800">
                {newOrder.paymentMethod === "vnpay" ? "💳 VNPay" : "💵 COD"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Địa chỉ giao hàng</span>
              <span className="text-gray-800 text-right max-w-xs">{newOrder.diaChiGiao}</span>
            </div>
          </div>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        {newOrder.items && newOrder.items.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
              Sản phẩm đã đặt
            </h2>
            <div className="space-y-4">
              {newOrder.items.map((item, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm uppercase line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">x{item.quantity}</span>
                      <span className="text-red-600 font-bold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TỔNG TIỀN */}
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-sm uppercase">Tổng cộng</span>
              <span className="text-red-600 font-bold text-xl">{formatPrice(total)}</span>
            </div>
          </div>
        )}

        {/* THÔNG BÁO VNPAY */}
        {newOrder.paymentMethod === "vnpay" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-700">
            <p className="font-medium mb-1">💳 Thanh toán VNPay</p>
            <p>Bạn sẽ được chuyển đến trang thanh toán VNPay. Vui lòng hoàn tất thanh toán để xác nhận đơn hàng.</p>
          </div>
        )}

        {/* CÁC NÚT */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/orders" className="flex-1">
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wide transition-colors">
              Xem đơn hàng
            </button>
          </Link>
          <Link to="/" className="flex-1">
            <button className="w-full border border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-600 font-medium py-3.5 rounded-lg text-sm transition-colors">
              Tiếp tục mua sắm
            </button>
          </Link>
        </div>

        {/* HỖ TRỢ */}
        <div className="text-center mt-6 text-xs text-gray-400">
          Cần hỗ trợ? Gọi ngay{" "}
          <a href="tel:0902216661" className="text-amber-500 font-medium hover:text-amber-600">
            0902 216 661
          </a>
        </div>

      </div>
    </div>
  );
}