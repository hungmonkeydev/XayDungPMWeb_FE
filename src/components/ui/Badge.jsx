import React from 'react';

// Component Badge nhận vào 3 props cơ bản
const Badge = ({
    children,            // Nội dung chữ bên trong Badge (VD: "Mới", "Hết hàng")
    variant = 'default', // Màu sắc chủ đề (success, danger, warning, info, default)
    className = ''
}) => {

    // 1. CSS Nền tảng: 
    const baseStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide";

    // 2. Menu Màu sắc (Theme)
    const variants = {
        default: "bg-gray-100 text-gray-800",       // Xám: Dùng cho trạng thái bình thường (VD: "Nháp")
        success: "bg-green-100 text-green-800",     // Xanh lá: Tích cực (VD: "Còn hàng", "Hoàn thành")
        danger: "bg-red-100 text-red-800",          // Đỏ: Tiêu cực (VD: "Hết hàng", "Đã hủy")
        warning: "bg-yellow-100 text-yellow-800",   // Vàng: Chờ đợi (VD: "Đang xử lý", "Sắp hết")
        info: "bg-blue-100 text-blue-800",          // Xanh dương: Nổi bật (VD: "Sản phẩm mới")
    };

    // 3. Trộn class và render
    const badgeClasses = `
    ${baseStyle} 
    ${variants[variant] || variants.default} 
    ${className}`.trim();

    return (
        <span className={badgeClasses}>
            {children}
        </span>
    );
};

export default Badge;