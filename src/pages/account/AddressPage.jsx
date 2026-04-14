import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AccountLayout from "./AccountLayout";
import { validateProfileForm } from "../../utils/validators";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm]           = useState({
    name:        user?.name        || "",
    email:       user?.email       || "",
    soDienThoai: user?.soDienThoai || "",
    diaChi:      user?.diaChi      || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => { if (!user) navigate("/login"); }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(""); setSuccess(false);
  };

  const handleSave = async () => {
    const err = validateProfileForm({ name: form.name, soDienThoai: form.soDienThoai });
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // TODO: gọi API PUT /customers/profile
      setSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-amber-500">Thông tin cá nhân</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-amber-500 hover:text-amber-600 border border-amber-400 hover:border-amber-500 px-4 py-1.5 rounded-lg transition-colors"
            >
              Chỉnh sửa
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-4 text-sm">
            <InfoRow label="Họ và tên"     value={user?.name        || "—"} />
            <InfoRow label="Email"         value={user?.email       || "—"} />
            <InfoRow label="Số điện thoại" value={user?.soDienThoai || "—"} />
            <InfoRow label="Địa chỉ"       value={user?.diaChi      || "—"} />
          </div>
        ) : (
          <div className="space-y-4">
            <InputRow label="Họ và tên"     value={form.name}        onChange={(v) => handleChange("name", v)}        placeholder="Nguyễn Văn A" />
            <InputRow label="Email"         value={form.email}       onChange={(v) => handleChange("email", v)}       placeholder="example@email.com" disabled />
            <InputRow label="Số điện thoại" value={form.soDienThoai} onChange={(v) => handleChange("soDienThoai", v)} placeholder="0901234567" />
            <InputRow label="Địa chỉ"       value={form.diaChi}      onChange={(v) => handleChange("diaChi", v)}      placeholder="123 Đường ABC, Quận 1" />

            {error   && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Cập nhật thành công!</p>}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
              <button
                onClick={() => { setIsEditing(false); setError(""); }}
                className="border border-gray-300 text-gray-600 hover:border-gray-400 px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="font-semibold text-gray-700 w-36 flex-shrink-0">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

function InputRow({ label, value, onChange, placeholder, disabled = false }) {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-sm font-medium text-gray-700 text-right">{label}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-amber-500 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
      />
    </div>
  );
}