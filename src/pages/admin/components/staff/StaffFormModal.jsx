// src/pages/admin/components/staff/StaffFormModal.jsx

import { useState } from "react";

const INIT_FORM = {
  name: "",
  email: "",
  password: "",
  type: "Staff",
  isActive: true,
  loginMethod: "email"
};

function InputField({ label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-stone-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-rose-500">{error}</p>}
      {hint && <p className="text-[11px] text-stone-400">{hint}</p>}
    </div>
  );
}

export default function StaffFormModal({ staff, onClose, onSave }) {
  const isEdit = !!staff;

  const [form, setForm] = useState(isEdit ? { ...staff, password: "" } : { ...INIT_FORM });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  const handle = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tên không được trống";
    if (!form.email.trim()) e.email = "Email không được trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email không hợp lệ";
    if (!isEdit && !form.password) e.password = "Mật khẩu không được trống";
    if (form.password && form.password.length < 6) e.password = "Mật khẩu phải có ít nhất 6 ký tự";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // TODO: gọi API POST/PUT /staff
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900">{isEdit ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}</h3>
            <p className="text-xs text-stone-400 mt-0.5">{isEdit ? `Đang sửa: ${staff.email}` : "Tạo tài khoản nhân viên mới"}</p>
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

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          {/* Name */}
          <InputField label="Họ và tên" required error={errors.name}>
            <input
              type="text"
              placeholder="VD: Nguyễn Thị An"
              value={form.name}
              onChange={handle("name")}
              className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none w-full transition-colors ${
                errors.name ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
              }`}
            />
          </InputField>

          {/* Email */}
          <InputField label="Email" required error={errors.email} hint={isEdit ? "Thay đổi email sẽ yêu cầu đăng nhập lại" : ""}>
            <input
              type="email"
              placeholder="ten@noithat.vn"
              value={form.email}
              onChange={handle("email")}
              className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none w-full transition-colors ${
                errors.email ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
              }`}
            />
          </InputField>

          {/* Password */}
          <InputField
            label={isEdit ? "Mật khẩu mới (tuỳ chọn)" : "Mật khẩu"}
            required={!isEdit}
            error={errors.password}
            hint={isEdit ? "Để trống nếu không muốn đổi mật khẩu" : ""}
          >
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder={isEdit ? "Nhập mật khẩu mới..." : "Tối thiểu 6 ký tự"}
                value={form.password}
                onChange={handle("password")}
                className={`border rounded-lg pl-3 pr-10 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none w-full transition-colors ${
                  errors.password ? "border-rose-400 bg-rose-50" : "border-stone-200 focus:border-stone-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                {showPw ? (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M13.875 13.875A7.5 7.5 0 012.5 10c0-1.3.35-2.5.95-3.56M6.2 6.2A7.5 7.5 0 0117.5 10c-.35 1-.9 1.9-1.6 2.7M3 3l14 14" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M10 4.5C5.5 4.5 2.5 10 2.5 10s3 5.5 7.5 5.5S17.5 10 17.5 10 14.5 4.5 10 4.5z" />
                    <circle cx="10" cy="10" r="2" />
                  </svg>
                )}
              </button>
            </div>
          </InputField>

          {/* Role */}
          <InputField label="Phân quyền" required>
            <div className="flex gap-3">
              {[
                { value: "Staff", label: "Staff", desc: "Xem và xử lý đơn hàng", icon: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /> },
                { value: "Admin", label: "Admin", desc: "Toàn quyền hệ thống", icon: <path d="M12 2L3 7v5c0 5 4 9.3 9 10 5-.7 9-5 9-10V7L12 2z" /> }
              ].map(opt => (
                <label
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, type: opt.value }))}
                  className={`flex-1 flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    form.type === opt.value
                      ? opt.value === "Admin"
                        ? "border-rose-400   bg-rose-50"
                        : "border-blue-400   bg-blue-50"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      form.type === opt.value ? (opt.value === "Admin" ? "bg-rose-100" : "bg-blue-100") : "bg-stone-100"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-4 h-4 ${form.type === opt.value ? (opt.value === "Admin" ? "text-rose-600" : "text-blue-600") : "text-stone-400"}`}
                    >
                      {opt.icon}
                      {opt.value === "Staff" && <circle cx="9" cy="7" r="4" />}
                    </svg>
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${form.type === opt.value ? (opt.value === "Admin" ? "text-rose-700" : "text-blue-700") : "text-stone-700"}`}>
                      {opt.label}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </InputField>

          {/* Active toggle */}
          <label className="flex items-center gap-3 cursor-pointer py-2 px-3 rounded-xl hover:bg-stone-50 transition-colors">
            <div
              onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              className={`relative w-10 rounded-full transition-colors cursor-pointer flex-shrink-0 ${form.isActive ? "bg-stone-900" : "bg-stone-200"}`}
              style={{ height: "22px" }}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.isActive ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">Kích hoạt tài khoản</p>
              <p className="text-[11px] text-stone-400">
                {form.isActive ? "Nhân viên có thể đăng nhập ngay sau khi tạo" : "Tài khoản sẽ bị khoá, nhân viên không thể đăng nhập"}
              </p>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-stone-100 bg-stone-50/50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors">
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 active:scale-95 transition-all duration-150"
          >
            {isEdit ? "Lưu thay đổi" : "Tạo nhân viên"}
          </button>
        </div>
      </div>
    </div>
  );
}
