import React from "react";
const Input = ({
    label,
    type = 'text',
    id,
    error,
    className,
    ...props
}) => {

    // 1. CSS mặc định cho ô Input: full viền, bo góc, có hiệu ứng chuyển màu khi click vào
    const baseInputStyle = "w-full px-4 py-2 border rounded-md outline-none transition-colors duration-200";

    // 2. CSS xử lý trạng thái Lỗi vs Bình thường
    const stateStyle = error
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
        : "border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200"; // Đã đổi sang màu gỗ (amber)

    // 3. CSS xử lý trạng thái bị vô hiệu hóa (disabled)
    const disabledStyle = props.disabled
        ? "bg-gray-100 cursor-not-allowed text-gray-500" // Khóa ô nhập: nền xám, chữ xám, chuột dấu cấm
        : "bg-white text-gray-900"; // Bình thường: nền trắng, chữ đen

    // Gom class lại cho ô input
    const inputClasses = `
    ${baseInputStyle}
    ${stateStyle}
    ${disabledStyle}
    ${className}`.trim();

    return <div className="flex flex-col w-full mb-4">

        {/* 4. HIỂN THỊ LABEL (Nếu lúc gọi component có truyền biến label thì mới in ra) */}
        {label && (
            <label htmlFor={id} className="mb-1 text-sm font-semibold text-gray-700">
                {label}
            </label>
        )}

        {/* 5. Ô NHẬP LIỆU CHÍNH */}
        <input
            id={id}
            type={type}
            className={inputClasses}
            {...props} // Rải toàn bộ các thuộc tính như onChange, placeholder, value... trực tiếp vào thẻ này
        />

        {/* 6. HIỂN THỊ LỖI (Nếu có biến error truyền vào thì in ra dòng chữ màu đỏ ở dưới cùng) */}
        {error && (
            <span className="mt-1 text-sm text-red-500">
                {error}
            </span>
        )}
    </div>
}