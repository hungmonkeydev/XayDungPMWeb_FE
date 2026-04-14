// src/pages/admin/components/promotions/PromotionFormModal.jsx

import { useState } from "react";
import useCategories from "../../../../hooks/useCategories";

const INIT_FORM = {
  code: "",
  name: "",
  description: "",
  type: "percentage",
  value: "",
  startDay: "",
  endDay: "",
  isActive: true
};

const today = new Date().toISOString().split("T")[0];

function InputField({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-stone-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-rose-500">{error}</p>}
    </div>
  );
}

export default function PromotionFormModal({ promotion, onClose, onSave }) {
  const { categories } = useCategories();
  const isEdit = !!promotion;

  const [form, setForm] = useState(
    isEdit
      ? {
          ...promotion,
          categoryIds: promotion.categoryIds || []
        }
      : { ...INIT_FORM }
  );

  const allSelected = categories.length > 0 && (form.categoryIds || []).length === categories.length;
  const [errors, setErrors] = useState({});

  const handle = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const toggleCategory = id => {
    setForm(f => {
      const ids = f.categoryIds || [];

      return {
        ...f,
        categoryIds: ids.includes(id) ? ids.filter(c => c !== id) : [...ids, id]
      };
    });
  };

  const toggleAllCategories = () => {
    const allIds = categories.map(c => c.id);

    setForm(f => ({
      ...f,
      categoryIds: (f.categoryIds || []).length === allIds.length ? [] : allIds
    }));
  };

  const handleStartDay = e => {
    const value = e.target.value;

    setForm(f => ({
      ...f,
      startDay: value,
      endDay: f.endDay && f.endDay < value ? value : f.endDay
    }));
  };

  const handleEndDay = e => {
    const value = e.target.value;

    setForm(f => ({
      ...f,
      endDay: value,
      startDay: f.startDay && value < f.startDay ? value : f.startDay
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = "Mã code không được trống";
    if (!form.name.trim()) e.name = "Tên không được trống";
    if (!form.value || form.value <= 0) e.value = "Giá trị phải lớn hơn 0";
    if (form.type === "percentage" && form.value > 100) e.value = "Phần trăm không thể vượt quá 100%";
    if (!form.startDay) {
      e.startDay = "Chọn ngày bắt đầu";
    } else if (form.startDay < today) {
      e.startDay = "Ngày bắt đầu phải từ hôm nay trở đi";
    }
    if (!form.endDay) {
      e.endDay = "Chọn ngày kết thúc";
    } else if (form.startDay && form.endDay < form.startDay) {
      e.endDay = "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu";
    }
    if (form.startDay && form.endDay && form.startDay > form.endDay) e.endDay = "Ngày kết thúc phải sau ngày bắt đầu";
    if (!form.categoryIds || form.categoryIds.length === 0) e.categoryIds = "Chọn ít nhất 1 danh mục";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // TODO: gọi API POST/PUT /promotions
    onSave(form);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 flex-shrink-0">
          <div>
            <h3 className="text-base font-bold text-stone-900">{isEdit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi mới"}</h3>
            <p className="text-xs text-stone-400 mt-0.5">{isEdit ? `Đang sửa: ${promotion.code}` : "Điền đầy đủ thông tin bên dưới"}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Code + Name */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Mã code" required error={errors.code}>
              <input
                type="text"
                placeholder="VD: SALE20"
                value={form.code}
                onChange={handle("code")}
                className={`border rounded-lg px-3 py-2.5 text-sm font-mono uppercase tracking-wider text-stone-900 placeholder:text-stone-400 placeholder:normal-case placeholder:tracking-normal outline-none w-full transition-colors ${
                  errors.code ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
                }`}
              />
            </InputField>

            <InputField label="Tên chương trình" required error={errors.name}>
              <input
                type="text"
                placeholder="VD: Flash sale tháng 4"
                value={form.name}
                onChange={handle("name")}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none w-full transition-colors ${
                  errors.name ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
                }`}
              />
            </InputField>
          </div>

          {/* Description */}
          <InputField label="Mô tả">
            <textarea
              rows={2}
              placeholder="Mô tả điều kiện, phạm vi áp dụng..."
              value={form.description}
              onChange={handle("description")}
              className="border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none resize-none w-full focus:border-stone-500 transition-colors"
            />
          </InputField>

          {/* Type + Value */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Loại giảm giá" required>
              <div className="flex gap-2">
                {[
                  { value: "percentage", label: "Phần trăm (%)" },
                  { value: "fixed", label: "Cố định (₫)" }
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center justify-center gap-1.5 flex-1 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-xs font-semibold ${
                      form.type === opt.value ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <input type="radio" name="type" value={opt.value} checked={form.type === opt.value} onChange={handle("type")} className="sr-only" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </InputField>

            <InputField label={form.type === "percentage" ? "Giá trị (%)" : "Số tiền giảm (₫)"} required error={errors.value}>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={form.type === "percentage" ? 100 : undefined}
                  placeholder={form.type === "percentage" ? "VD: 20" : "VD: 500000"}
                  value={form.value}
                  onChange={handle("value")}
                  className={`border rounded-lg pl-3 pr-10 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none w-full transition-colors ${
                    errors.value ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">{form.type === "percentage" ? "%" : "₫"}</span>
              </div>
            </InputField>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Ngày bắt đầu" required error={errors.startDay}>
              <input
                type="date"
                value={form.startDay}
                onChange={handleStartDay}
                min={today}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 outline-none w-full cursor-pointer transition-colors ${
                  errors.startDay ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
                }`}
              />
            </InputField>

            <InputField label="Ngày kết thúc" required error={errors.endDay}>
              <input
                type="date"
                value={form.endDay}
                min={form.startDay || today}
                onChange={handleEndDay}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 outline-none w-full cursor-pointer transition-colors ${
                  errors.endDay ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
                }`}
              />
            </InputField>
          </div>

          {/* Categories */}
          <InputField label="Danh mục áp dụng" required error={errors.categoryIds}>
            <div className="border border-stone-200 rounded-xl p-3 space-y-2">
              {/* Select all */}
              <label className="flex items-center gap-2.5 px-1 py-1 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                <div
                  onClick={toggleAllCategories}
                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 cursor-pointer border-2 transition-colors ${
                    allSelected ? "bg-stone-900 border-stone-900" : "border-stone-300 hover:border-stone-500"
                  }`}
                >
                  {allSelected && (
                    <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                      <path d="M2 5l2.5 2.5L8 3" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-semibold text-stone-700">Tất cả danh mục</span>
              </label>

              <div className="border-t border-stone-100 pt-2 grid grid-cols-2 gap-1">
                {categories.map(cat => {
                  const checked = (form.categoryIds || []).includes(cat.id);

                  return (
                    <label key={cat.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-stone-50">
                      <div onClick={() => toggleCategory(cat.id)} className={`w-4 h-4 border-2 ${checked ? "bg-stone-900 border-stone-900" : "border-stone-300"}`} />
                      <span className="text-xs">{cat.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </InputField>

          {/* Active toggle */}
          <label className="flex items-center gap-3 cursor-pointer py-2">
            <div
              onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${form.isActive ? "bg-stone-900" : "bg-stone-200"}`}
              style={{ height: "22px" }}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.isActive ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">Kích hoạt ngay</p>
              <p className="text-[11px] text-stone-400">{form.isActive ? "Khuyến mãi sẽ hoạt động theo thời gian đã chọn" : "Khuyến mãi sẽ ở trạng thái tắt"}</p>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-stone-100 flex-shrink-0 bg-stone-50/50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors">
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 active:scale-95 transition-all duration-150"
          >
            {isEdit ? "Lưu thay đổi" : "Tạo khuyến mãi"}
          </button>
        </div>
      </div>
    </div>
  );
}
