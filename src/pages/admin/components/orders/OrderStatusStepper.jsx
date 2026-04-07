// src/pages/admin/components/orders/OrderStatusStepper.jsx
// Hiển thị timeline trạng thái đơn hàng (không hiện bước "Đã huỷ")

const STEPS = [
  { key: "pending", label: "Chờ xử lý", icon: "clock" },
  { key: "confirmed", label: "Xác nhận", icon: "check" },
  { key: "shipping", label: "Đang giao", icon: "truck" },
  { key: "completed", label: "Hoàn tất", icon: "flag" }
];

const ORDER_IDX = { pending: 0, confirmed: 1, shipping: 2, completed: 3 };

function StepIcon({ type, done, active }) {
  const base = "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300";
  const cls = done ? `${base} bg-stone-900 text-white` : active ? `${base} bg-stone-900 text-white ring-4 ring-stone-200` : `${base} bg-stone-100 text-stone-400`;

  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    check: <path d="M5 13l4 4L19 7" />,
    truck: (
      <>
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    flag: (
      <>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </>
    )
  };

  return (
    <div className={cls}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        {paths[type]}
      </svg>
    </div>
  );
}

export default function OrderStatusStepper({ status }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl">
        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-700">Đơn hàng đã bị huỷ</p>
          <p className="text-xs text-rose-400 mt-0.5">Đơn hàng này không thể khôi phục</p>
        </div>
      </div>
    );
  }

  const currentIdx = ORDER_IDX[status] ?? 0;

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <StepIcon type={step.icon} done={done} active={active} />
              <span className={`text-[10px] font-semibold whitespace-nowrap ${done || active ? "text-stone-800" : "text-stone-400"}`}>{step.label}</span>
            </div>
            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500" style={{ background: idx < currentIdx ? "#1c1917" : "#e7e5e4" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
