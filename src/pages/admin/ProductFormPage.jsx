// src/pages/admin/ProductFormPage.jsx
// Dùng cho cả tạo mới (/admin/products/create) và sửa (/admin/products/edit)
// prop `product` = undefined → tạo mới; có giá trị → sửa

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockProducts, mockCategories, mockColors, mockDimensions } from "./_mockProducts";

/* ── helpers ── */
const emptyAttribute = () => ({
  _key: Math.random().toString(36).slice(2),
  colorId: "",
  dimensionsId: "",
  name: "",
  price: "",
  stock: ""
});

function InputField({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-stone-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-stone-400">{hint}</p>}
    </div>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/60">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        {description && <p className="text-xs text-stone-400 mt-0.5">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ── Main component ── */
export default function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const product = mockProducts.find(p => p.id === Number(id));

  const [form, setForm] = useState({
    name: product?.name ?? "",
    categoryId: product?.categoryId ?? "",
    description: product?.description ?? "",
    status: product?.status ?? "active"
  });

  const [attributes, setAttributes] = useState(product?.attributes?.map(a => ({ ...a, _key: a.id })) ?? [emptyAttribute()]);

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleForm = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleAttr = (key, idx) => e => setAttributes(prev => prev.map((a, i) => (i === idx ? { ...a, [key]: e.target.value } : a)));

  const addAttribute = () => setAttributes(a => [...a, emptyAttribute()]);
  const removeAttribute = idx => setAttributes(a => a.filter((_, i) => i !== idx));

  const handleImage = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tên sản phẩm không được trống";
    if (!form.categoryId) e.categoryId = "Vui lòng chọn danh mục";
    if (!form.description.trim()) e.description = "Mô tả không được trống";
    attributes.forEach((a, i) => {
      if (!a.colorId) e[`attr_${i}_color`] = "Chọn màu";
      if (!a.dimensionsId) e[`attr_${i}_dim`] = "Chọn kích thước";
      if (!a.price) e[`attr_${i}_price`] = "Nhập giá";
      if (a.stock === "") e[`attr_${i}_stock`] = "Nhập tồn kho";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: gọi API create/update
    console.log("Submit:", { ...form, attributes });
    navigate("/admin/products");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-[900px] space-y-5">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/products")}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M10 4L6 8l4 4" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">{isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
          <p className="text-xs text-stone-400 mt-0.5">{isEdit ? `Đang chỉnh sửa: ${product.name}` : "Điền thông tin và thêm biến thể sản phẩm"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Basic info ── */}
        <SectionCard title="Thông tin cơ bản" description="Tên, danh mục và mô tả sản phẩm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <InputField label="Tên sản phẩm" required>
              <input
                type="text"
                placeholder="VD: Ghế sofa L Milan"
                value={form.name}
                onChange={handleForm("name")}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors w-full
                  ${errors.name ? "border-rose-400 bg-rose-50 focus:border-rose-500" : "border-stone-200 bg-white focus:border-stone-500"}`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </InputField>

            {/* Category */}
            <InputField label="Danh mục" required>
              <select
                value={form.categoryId}
                onChange={handleForm("categoryId")}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 outline-none cursor-pointer w-full transition-colors
                  ${errors.categoryId ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-500"}`}
              >
                <option value="">Chọn danh mục...</option>
                {mockCategories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-[11px] text-rose-500 mt-1">{errors.categoryId}</p>}
            </InputField>

            {/* Description */}
            <div className="sm:col-span-2">
              <InputField label="Mô tả sản phẩm" required>
                <textarea
                  rows={4}
                  placeholder="Mô tả chất liệu, kích thước, tính năng nổi bật..."
                  value={form.description}
                  onChange={handleForm("description")}
                  className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none resize-none w-full transition-colors
                    ${errors.description ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-500"}`}
                />
                {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
              </InputField>
            </div>

            {/* Status */}
            <InputField label="Trạng thái">
              <div className="flex gap-3">
                {[
                  { value: "active", label: "Đang bán" },
                  { value: "inactive", label: "Ngừng bán" }
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm font-medium flex-1 justify-center
                      ${form.status === opt.value ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                  >
                    <input type="radio" name="status" value={opt.value} checked={form.status === opt.value} onChange={handleForm("status")} className="sr-only" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </InputField>
          </div>
        </SectionCard>

        {/* ── Image upload ── */}
        <SectionCard title="Ảnh sản phẩm" description="Ảnh đại diện chính của sản phẩm">
          <div className="flex items-start gap-5">
            {/* Preview */}
            <div className="w-28 h-28 rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center bg-stone-50 overflow-hidden flex-shrink-0">
              {imagePreview ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> : <span className="text-3xl">🪑</span>}
            </div>
            {/* Upload zone */}
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-stone-200 rounded-xl cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-stone-400 mb-2"
                >
                  <path d="M4 16l4-4 4 4M12 12l4-4 4 4" />
                  <path d="M4 20h16M12 12V4" />
                </svg>
                <p className="text-xs font-medium text-stone-600">Click để tải ảnh lên</p>
                <p className="text-[10px] text-stone-400 mt-0.5">PNG, JPG tối đa 5MB</p>
                <input type="file" accept="image/*" className="sr-only" onChange={handleImage} />
              </label>
            </div>
          </div>
        </SectionCard>

        {/* ── Attributes ── */}
        <SectionCard title="Biến thể sản phẩm" description="Mỗi biến thể là một tổ hợp màu sắc + kích thước với giá và tồn kho riêng">
          <div className="space-y-3">
            {attributes.map((attr, idx) => (
              <div key={attr._key} className="border border-stone-100 rounded-xl p-4 bg-stone-50/40 relative group">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-stone-600">Biến thể #{idx + 1}</p>
                  {attributes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAttribute(idx)}
                      className="text-[11px] text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors"
                    >
                      Xoá
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {/* Color */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Màu sắc <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={attr.colorId}
                      onChange={handleAttr("colorId", idx)}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 outline-none w-full
                        ${errors[`attr_${idx}_color`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white"}`}
                    >
                      <option value="">Chọn màu</option>
                      {mockColors.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors[`attr_${idx}_color`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_color`]}</p>}
                  </div>

                  {/* Dimensions */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Kích thước <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={attr.dimensionsId}
                      onChange={handleAttr("dimensionsId", idx)}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 outline-none w-full
                        ${errors[`attr_${idx}_dim`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white"}`}
                    >
                      <option value="">Chọn size</option>
                      {mockDimensions.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {errors[`attr_${idx}_dim`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_dim`]}</p>}
                  </div>

                  {/* Custom name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">Tên biến thể</label>
                    <input
                      type="text"
                      placeholder="Tự động tạo nếu trống"
                      value={attr.name}
                      onChange={handleAttr("name", idx)}
                      className="border border-stone-200 bg-white rounded-lg px-2.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none w-full focus:border-stone-400"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Giá bán (₫) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="VD: 12400000"
                      value={attr.price}
                      onChange={handleAttr("price", idx)}
                      min={0}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none w-full
                        ${errors[`attr_${idx}_price`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-400"}`}
                    />
                    {errors[`attr_${idx}_price`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_price`]}</p>}
                  </div>

                  {/* Stock */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Tồn kho <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="VD: 10"
                      value={attr.stock}
                      onChange={handleAttr("stock", idx)}
                      min={0}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none w-full
                        ${errors[`attr_${idx}_stock`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-400"}`}
                    />
                    {errors[`attr_${idx}_stock`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_stock`]}</p>}
                  </div>
                </div>
              </div>
            ))}

            {/* Add variant button */}
            <button
              type="button"
              onClick={addAttribute}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-stone-200 rounded-xl text-sm text-stone-500 font-medium hover:border-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                <path d="M8 2v12M2 8h12" />
              </svg>
              Thêm biến thể
            </button>
          </div>
        </SectionCard>

        {/* ── Submit bar ── */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Huỷ
          </button>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 active:scale-95 transition-all duration-150"
            >
              {isEdit ? "Lưu thay đổi" : "Tạo sản phẩm"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
