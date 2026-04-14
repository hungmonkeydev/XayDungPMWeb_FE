import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrders";
import AccountLayout from "./AccountLayout";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

const STATUS_MAP = {
  pending:   { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  confirmed: { label: "Đã xác nhận",  color: "bg-blue-100 text-blue-700 border-blue-200" },
  shipping:  { label: "Đang giao",    color: "bg-purple-100 text-purple-700 border-purple-200" },
  completed: { label: "Hoàn thành",   color: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Đã hủy",       color: "bg-red-100 text-red-700 border-red-200" },
};

export default function OrderHistoryPage() {
  const { user }                                    = useAuth();
  const { orders, loading, error, handleFetchOrders } = useOrders();
  const navigate                                    = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else handleFetchOrders();
  }, [user]);

  return (
    <AccountLayout breadcrumb="Lịch sử đơn hàng">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-amber-500 mb-4">Danh sách đơn hàng</h2>

        {loading && <div className="text-center py-8 text-gray-400 text-sm">Đang tải...</div>}

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm">{error}</div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-4 py-3 text-sm">
            Không có đơn hàng
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => {
              const status = STATUS_MAP[order.status] || { label: order.status, color: "bg-gray-100 text-gray-600" };
              const total  = order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || order.total || 0;
              return (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-800">#{order.trackingNumber || order.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {order.items?.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0" />
                        <span className="line-clamp-1">{item.name}</span>
                        <span className="text-gray-400 flex-shrink-0">x{item.quantity}</span>
                      </div>
                    ))}
                    {order.items?.length > 2 && (
                      <p className="text-xs text-gray-400 pl-3">+{order.items.length - 2} sản phẩm khác</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {order.paymentMethod === "vnpay" ? "💳 VNPay" : "💵 COD"}
                    </span>
                    <span className="text-red-600 font-bold text-sm">{formatPrice(total)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}