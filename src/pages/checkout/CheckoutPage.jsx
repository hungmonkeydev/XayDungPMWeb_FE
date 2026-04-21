import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrders";
import useCart from "../../hooks/useCart";
import { validateCheckoutForm } from "../../utils/validators";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + "đ";

export default function CheckoutPage() {
  const { user, handleLogout } = useAuth();
  const { handleCreateOrder, loading, error } = useOrders();
  const { cart: cartItems } = useCart();
  const navigate  = useNavigate();

  const [form, setForm] = useState({
    hoTen:       user?.name        || "",
    soDienThoai: user?.soDienThoai || "",
    quocGia:     "Vietnam",
    diaChi:      "",
    tinhThanh:   "",
    ghiChu:      "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode]         = useState("");
  const [promoApplied, setPromoApplied]   = useState(false);
  const [localError, setLocalError]       = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat      = Math.round(subtotal * 0.08);
  const total    = subtotal + vat;

  useEffect(() => { if (!user) navigate("/login"); }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setLocalError("");
  };

  const handleApplyPromo = () => {
    if (!promoCode) return;
    setPromoApplied(true);
    // TODO: gọi API validate promo
  };

  const handleSubmit = async () => {
    const err = validateCheckoutForm({
      hoTen:       form.hoTen,
      soDienThoai: form.soDienThoai,
      diaChi:      form.diaChi,
      tinhThanh:   form.tinhThanh,
    });
    if (err) { setLocalError(err); return; }
    if (cartItems.length === 0) { setLocalError("Giỏ hàng trống, vui lòng thêm sản phẩm!"); return; }
    setLocalError("");
    await handleCreateOrder({
      customerName:    form.hoTen,
      customerPhone:   form.soDienThoai,
      customerAddress: `${form.diaChi}, ${form.tinhThanh}`,
      method:          paymentMethod.toUpperCase(),
      note:            form.ghiChu,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-xl font-bold text-gray-800 mb-6">Nội Thất Luxvie</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* CỘT TRÁI */}
          <div className="lg:col-span-3 space-y-4">

            <Section>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Tài khoản</h3>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                  Đăng xuất
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3 bg-gray-50 rounded-lg p-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {user?.name?.slice(0, 2).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </Section>

            <Section>
              <h3 className="font-semibold text-gray-800 mb-4">Thông tin giao hàng</h3>
              <div className="space-y-3">
                <FormInput label="Họ và tên"     value={form.hoTen}       onChange={(v) => handleChange("hoTen", v)}       placeholder="Họ và tên" />
                <FormInput label="Số điện thoại" value={form.soDienThoai} onChange={(v) => handleChange("soDienThoai", v)} placeholder="Số điện thoại" />
                <FormInput label="Quốc gia"      value={form.quocGia}     onChange={(v) => handleChange("quocGia", v)}     placeholder="Quốc gia" />
                <FormInput label="Địa chỉ"       value={form.diaChi}      onChange={(v) => handleChange("diaChi", v)}      placeholder="Địa chỉ, tên đường" highlight />
                <FormInput label="Tỉnh/TP"       value={form.tinhThanh}   onChange={(v) => handleChange("tinhThanh", v)}   placeholder="Tỉnh/TP, Quận/Huyện, Phường/Xã" />
              </div>
            </Section>

            <Section>
              <h3 className="font-semibold text-gray-800 mb-4">Phương thức giao hàng</h3>
              <div className="border border-blue-300 rounded-lg p-4 flex items-center justify-between bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                  </div>
                  <span className="text-sm text-gray-700">Vận chuyển trên 5 triệu</span>
                </div>
                <span className="text-sm font-medium text-green-600">Miễn phí</span>
              </div>
            </Section>

            <Section>
              <h3 className="font-semibold text-gray-800 mb-4">Phương thức thanh toán</h3>
              <div className="space-y-3">
                <PaymentOption value="cod"   selected={paymentMethod === "cod"}   onSelect={setPaymentMethod} icon="🏦" label="Thanh toán khi giao hàng (COD)" />
                <PaymentOption value="vnpay" selected={paymentMethod === "vnpay"} onSelect={setPaymentMethod} icon="💳" label="Thanh toán VNPay" />
              </div>
            </Section>

            <Section>
              <textarea
                value={form.ghiChu}
                onChange={(e) => handleChange("ghiChu", e.target.value)}
                placeholder="Ghi chú đơn hàng"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-gray-400 resize-none bg-transparent"
              />
            </Section>

          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-2 space-y-4">

            <Section>
              <h3 className="font-semibold text-gray-800 mb-4">Giỏ hàng</h3>
              {cartItems.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-400">Giỏ hàng trống</p>
                  <Link to="/" className="text-amber-500 text-sm hover:text-amber-600 mt-1 block">Tiếp tục mua sắm</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">x{item.quantity}</span>
                          <span className="text-sm font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            <Section>
              <h3 className="font-semibold text-gray-800 mb-3">Mã khuyến mãi</h3>
              <div className="border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between mb-3 cursor-pointer hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🎟</span><span>Chọn mã</span>
                </div>
                <span className="text-gray-400">›</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã khuyến mãi"
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-gray-400"
                />
                <button onClick={handleApplyPromo} className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap">
                  Áp dụng
                </button>
              </div>
              {promoApplied && <p className="text-green-600 text-xs mt-2">✓ Đã áp dụng mã khuyến mãi!</p>}
            </Section>

            <Section>
              <h3 className="font-semibold text-gray-800 mb-4">Tóm tắt đơn hàng</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tổng tiền hàng</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span><span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT</span><span>{formatPrice(vat)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Tổng thanh toán</span>
                  <span className="font-bold text-gray-800 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {localError && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-2 text-sm mb-3">{localError}</div>
              )}
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-2 text-sm mb-3">{error}</div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-bold py-4 rounded-lg text-sm uppercase tracking-wide transition-colors"
              >
                {loading ? "Đang xử lý..." : "Đặt hàng"}
              </button>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ children }) {
  return <div className="bg-white rounded-xl border border-gray-200 p-5">{children}</div>;
}

function FormInput({ label, value, onChange, placeholder, highlight = false }) {
  return (
    <div className={`border rounded-lg px-4 py-2.5 transition-colors ${highlight ? "border-blue-400 bg-blue-50" : "border-gray-300 focus-within:border-gray-400"}`}>
      <label className="text-xs text-gray-400 block mb-0.5">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full text-sm text-gray-800 outline-none bg-transparent" />
    </div>
  );
}

function PaymentOption({ value, selected, onSelect, icon, label }) {
  return (
    <div onClick={() => onSelect(value)}
      className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-colors ${selected ? "border-gray-800 bg-gray-50" : "border-gray-300 hover:border-gray-400"}`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? "border-gray-800" : "border-gray-300"}`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
      </div>
      <span className="text-lg">{icon}</span>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}