// src/pages/admin/CustomerDetailPage.jsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCustomers } from "./_mockCustomers";
import { STATUS_CFG } from "./_mockOrders";

/* ── Helpers ── */
function fmtPrice(n) {
  if (n === 0) return "₫0";
  return "₫" + n.toLocaleString("vi-VN");
}
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}
function initials(name) {
  const parts = name.trim().split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700"
];

/* ── Info row ── */
function InfoRow({ label, children }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-stone-50 last:border-0">
      <span className="text-xs text-stone-400 w-32 flex-shrink-0 pt-0.5">{label}</span>
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
            Huỷ
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
export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = mockCustomers.find(c => c.id === Number(id));
  const [localCustomer, setLocalCustomer] = useState(customer);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");

  const orders = mockCustomers[localCustomer.id] ?? [];
  const colorCls = AVATAR_COLORS[localCustomer.id % AVATAR_COLORS.length];
  const totalSpent = orders.reduce((s, o) => s + o.totalPrice, 0) || localCustomer.totalSpent;

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleToggle = () => {
    // TODO: gọi API PATCH /customers/:id { isActive: !customer.isActive }
    setLocalCustomer(c => ({ ...c, isActive: !c.isActive }));
    setModal(false);
    showToast(localCustomer.isActive ? "Tài khoản đã bị vô hiệu hoá." : "Tài khoản đã được kích hoạt.");
  };

  return (
    <div className="p-6 max-w-[960px] space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
          <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
            <path d="M5 10l4 4 6-7" />
          </svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/customers")}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M10 4L6 8l4 4" />
            </svg>
          </button>
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">Hồ sơ khách hàng</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              ID #{localCustomer.id} · Tham gia {fmtDate(localCustomer.createdAt)}
            </p>
          </div>
        </div>

        {/* Toggle status button */}
        <button
          onClick={() => setModal(true)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
            localCustomer.isActive ? "border border-rose-200 text-rose-600 hover:bg-rose-50" : "border border-emerald-200 text-emerald-600 hover:bg-emerald-50"
          }`}
        >
          {localCustomer.isActive ? "Vô hiệu hoá tài khoản" : "Kích hoạt tài khoản"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left: profile card ── */}
        <div className="space-y-5">
          <SectionCard title="Thông tin cá nhân">
            {/* Avatar + name */}
            <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-stone-50">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-3 ${colorCls}`}>{initials(customer.name)}</div>
              <p className="text-base font-bold text-stone-900">{localCustomer.name}</p>
              <p className="text-xs text-stone-400 mt-0.5">{localCustomer.email}</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${localCustomer.isActive ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}
                >
                  {localCustomer.isActive ? "Hoạt động" : "Vô hiệu hoá"}
                </span>
              </div>
            </div>

            <InfoRow label="Đăng nhập qua">
              {localCustomer.loginMethod === "google" ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Google</span>
              ) : (
                <span className="inline-flex text-[11px] font-semibold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">Email</span>
              )}
            </InfoRow>
            <InfoRow label="Ngày tham gia">{fmtDate(localCustomer.createdAt)}</InfoRow>
            <InfoRow label="Đơn gần nhất">{fmtDate(localCustomer.lastOrderAt)}</InfoRow>
          </SectionCard>

          {/* Spending summary */}
          <SectionCard title="Tổng quan mua hàng">
            <div className="space-y-3">
              {[
                { label: "Tổng đơn hàng", value: localCustomer.totalOrders, suffix: "đơn", color: "text-stone-900" },
                { label: "Tổng chi tiêu", value: fmtPrice(totalSpent), suffix: "", color: "text-stone-900" }
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                  <span className="text-xs text-stone-400">{row.label}</span>
                  <span className={`text-sm font-bold tabular-nums ${row.color}`}>
                    {row.value}
                    {row.suffix && <span className="text-xs font-medium text-stone-400 ml-1">{row.suffix}</span>}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* ── Right: order history ── */}
        <div className="lg:col-span-2">
          <SectionCard
            title={`Lịch sử đơn hàng (${orders.length})`}
            action={
              orders.length > 0 && (
                <span className="text-xs text-stone-400">
                  Tổng: <span className="font-semibold text-stone-700">{fmtPrice(totalSpent)}</span>
                </span>
              )
            }
          >
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center mb-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-stone-400"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-stone-500">Chưa có đơn hàng nào</p>
                <p className="text-xs text-stone-400 mt-0.5">Khách hàng này chưa đặt đơn</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => {
                  const scfg = STATUS_CFG[order.status];
                  return (
                    <div
                      key={order.id}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50/50 transition-all cursor-pointer group"
                      onClick={() => navigate(`/admin/orders/detail/${order.id}`)}
                    >
                      {/* Order icon */}
                      <div className="w-9 h-9 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 text-stone-500"
                        >
                          <path d="M4 4h12v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          <path d="M8 4V3a2 2 0 014 0v1" />
                          <path d="M7 10l2 2 4-4" />
                        </svg>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-stone-800">{order.code}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${scfg.cls}`}>{scfg.label}</span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5 truncate">{order.productName}</p>
                        <p className="text-[10px] text-stone-300 mt-0.5">{fmtDate(order.createdAt)}</p>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-bold text-stone-900 tabular-nums">{fmtPrice(order.totalPrice)}</span>
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-600 transition-colors"
                        >
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      {/* Confirm modal */}
      {modal && (
        <ConfirmModal
          title={localCustomer.isActive ? "Vô hiệu hoá tài khoản?" : "Kích hoạt tài khoản?"}
          message={
            localCustomer.isActive
              ? `Tài khoản "${localCustomer.name}" sẽ bị vô hiệu hoá. Khách hàng sẽ không thể đăng nhập cho đến khi được mở lại.`
              : `Tài khoản "${localCustomer.name}" sẽ được kích hoạt trở lại và khách hàng có thể đăng nhập bình thường.`
          }
          confirmLabel={localCustomer.isActive ? "Vô hiệu hoá" : "Kích hoạt"}
          confirmCls={localCustomer.isActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"}
          onConfirm={handleToggle}
          onCancel={() => setModal(false)}
        />
      )}
    </div>
  );
}
