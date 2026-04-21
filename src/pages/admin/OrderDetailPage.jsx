// src/pages/admin/OrderDetailPage.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useOrders from "../../hooks/useOrderAdmin";
import OrderStatusStepper from "./components/orders/OrderStatusStepper";

/* ── Helpers ── */
// Thứ tự chuyển trạng thái hợp lệ
const STATUS_FLOW = {
  pending: "confirmed",
  confirmed: "shipping",
  shipping: "completed",
  completed: null,
  cancelled: null
};

const STATUS_CFG = {
  pending: { label: "Chờ xử lý", cls: "bg-amber-50  text-amber-700", dot: "bg-amber-400" },
  confirmed: { label: "Xác nhận", cls: "bg-violet-50 text-violet-700", dot: "bg-violet-400" },
  shipping: { label: "Đang giao", cls: "bg-blue-50   text-blue-700", dot: "bg-blue-400" },
  completed: { label: "Hoàn tất", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { label: "Đã huỷ", cls: "bg-rose-50   text-rose-700", dot: "bg-rose-400" }
};

const PAYMENT_STATUS_CFG = {
  pending: { label: "Chờ thanh toán", cls: "bg-amber-50 text-amber-700" },
  success: { label: "Đã thanh toán", cls: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Thất bại", cls: "bg-rose-50 text-rose-700" }
};
function fmtPrice(n) {
  return "₫" + n.toLocaleString("vi-VN");
}
function fmtDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) + " lúc " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}

/* ── Info row ── */
function InfoRow({ label, children }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-stone-50 last:border-0">
      <span className="text-xs text-stone-400 w-36 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-xs font-medium text-stone-800 flex-1">{children}</span>
    </div>
  );
}

/* ── Section card ── */
function SectionCard({ title, children, action }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100 bg-stone-50/60">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ── Confirm modal ── */
function ConfirmModal({ title, message, confirmLabel, confirmCls, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.35)" }}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <h4 className="text-base font-bold text-stone-900">{title}</h4>
        <p className="text-sm text-stone-500 leading-relaxed">{message}</p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Không
          </button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 ${confirmCls}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById } = useOrders();

  const [orderState, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(null); // "advance" | "cancel"
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const data = await getById(id);
      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading || !orderState) {
    return <div className="p-6">Đang tải...</div>;
  }

  const scfg = STATUS_CFG[orderState.status];
  const nextStatus = STATUS_FLOW[orderState.status];
  const nextLabel = nextStatus ? STATUS_CFG[nextStatus]?.label : null;
  const canAdvance = !!nextStatus;
  const canCancel = !["completed", "cancelled"].includes(orderState.status);

  /* Toast Helper */
  const showToast = msg => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAdvance = () => {
    // TODO: gọi API PATCH /orders/:id/status
    setOrder(o => ({ ...o, status: nextStatus }));
    setModal(null);
    showToast(`Đơn hàng đã chuyển sang "${STATUS_CFG[nextStatus].label}"`);
  };

  const handleCancel = () => {
    // TODO: gọi API PATCH /orders/:id/status { status: "cancelled" }
    setOrder(o => ({ ...o, status: "cancelled" }));
    setModal(null);
    showToast("Đơn hàng đã được huỷ.");
  };

  const pymCfg = PAYMENT_STATUS_CFG[orderState.payment.status];

  return (
    <div className="p-6 max-w-[960px] space-y-5">
      {/* ── Toast ── */}
      {successMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-fade-in">
          <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
            <path d="M5 10l4 4 6-7" />
          </svg>
          {successMsg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M10 4L6 8l4 4" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">Đơn hàng {orderState.code}</h2>
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${scfg.cls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${scfg.dot}`} />
                {scfg.label}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">Tạo lúc {fmtDate(orderState.createdAt)}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {canCancel && (
            <button
              onClick={() => setModal("cancel")}
              className="px-4 py-2 rounded-xl border border-rose-200 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
            >
              Huỷ đơn
            </button>
          )}
          {canAdvance && (
            <button
              onClick={() => setModal("advance")}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 active:scale-95 transition-all"
            >
              Chuyển → {nextLabel}
            </button>
          )}
        </div>
      </div>

      {/* ── Status stepper ── */}
      <SectionCard title="Tiến trình đơn hàng">
        <OrderStatusStepper status={orderState.status} />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left col */}
        <div className="lg:col-span-2 space-y-5">
          {/* Order items */}
          <SectionCard title={`Sản phẩm (${orderState.details.length})`}>
            <div className="space-y-3">
              {orderState.details.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🪑</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{item.productName}</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Số lượng: <span className="font-semibold text-stone-700">×{item.quantity}</span>
                      <span className="mx-2">·</span>
                      Đơn giá: <span className="font-semibold text-stone-700">{fmtPrice(item.unitPrice)}</span>
                    </p>
                  </div>
                  <p className="text-sm font-bold text-stone-900 tabular-nums flex-shrink-0">{fmtPrice(item.total)}</p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Tạm tính</span>
                <span className="tabular-nums">{fmtPrice(orderState.subtotal)}</span>
              </div>
              {orderState.discountAmount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600">
                  <span>Giảm giá {orderState.promotionCode && `(${orderState.promotionCode})`}</span>
                  <span className="tabular-nums">-{fmtPrice(orderState.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-100">
                <span>Tổng cộng</span>
                <span className="tabular-nums">{fmtPrice(orderState.totalPrice)}</span>
              </div>
            </div>
          </SectionCard>

          {/* Payment info */}
          <SectionCard title="Thông tin thanh toán">
            <div>
              <InfoRow label="Phương thức">
                <span
                  className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    orderState.payment.method === "VNPay" ? "bg-blue-50 text-blue-600" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {orderState.payment.method}
                </span>
              </InfoRow>
              <InfoRow label="Mã giao dịch">
                <span className="font-mono text-[11px] text-stone-600 bg-stone-50 px-2 py-0.5 rounded">{orderState.payment.transactionId}</span>
              </InfoRow>
              <InfoRow label="Số tiền">{fmtPrice(orderState.payment.amount)}</InfoRow>
              <InfoRow label="Trạng thái thanh toán">
                <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${pymCfg.cls}`}>{pymCfg.label}</span>
              </InfoRow>
            </div>
          </SectionCard>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* Customer info */}
          <SectionCard title="Khách hàng">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {orderState.customerName.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">{orderState.customerName}</p>
                <p className="text-xs text-stone-400">{orderState.customerPhone}</p>
              </div>
            </div>
            <InfoRow label="Địa chỉ giao">{orderState.customerAddress}</InfoRow>
            {orderState.note && <InfoRow label="Ghi chú">{orderState.note}</InfoRow>}
          </SectionCard>

          {/* Order summary */}
          <SectionCard title="Tóm tắt đơn hàng">
            <InfoRow label="Mã đơn">{orderState.code}</InfoRow>
            <InfoRow label="Ngày đặt">{fmtDate(orderState.createdAt)}</InfoRow>
            <InfoRow label="Phương thức vận chuyển">Giao hàng tiêu chuẩn</InfoRow>
            {orderState.promotionCode && (
              <InfoRow label="Mã khuyến mãi">
                <span className="font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[11px]">{orderState.promotionCode}</span>
              </InfoRow>
            )}
          </SectionCard>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal === "advance" && (
        <ConfirmModal
          title={`Chuyển sang "${nextLabel}"?`}
          message={`Xác nhận chuyển trạng thái đơn ${orderState.code} từ "${scfg.label}" sang "${nextLabel}". Hành động này không thể hoàn tác.`}
          confirmLabel={`Xác nhận → ${nextLabel}`}
          confirmCls="bg-stone-900 hover:bg-stone-700"
          onConfirm={handleAdvance}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === "cancel" && (
        <ConfirmModal
          title="Huỷ đơn hàng?"
          message={`Bạn có chắc muốn huỷ đơn ${orderState.code}? Hành động này không thể hoàn tác và sẽ cập nhật trạng thái thanh toán.`}
          confirmLabel="Xác nhận huỷ"
          confirmCls="bg-rose-600 hover:bg-rose-700"
          onConfirm={handleCancel}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}
