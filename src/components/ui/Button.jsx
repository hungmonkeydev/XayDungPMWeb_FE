import React from "react";
const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    dissabled = false,
    className = ''
}) => {
    // 1. baseStyle: Các class CSS nền tảng, nút nào cũng phải có
    const baseStyles = "inline-flex items-center justify-center font-medium rounded transition duration-200";

    // 2. variants: "Menu" màu sắc.
    const variants = {
        primary: "bg-amber-700 text-white hover:bg-amber-800 focus:ring-amber-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    }

    // 3. sizes: "Menu" kích cỡ. Tương tự như màu sắc, chỉnh to nhỏ nhờ padding (px, py)
    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-5 py-3 text-lg",
    }

    // 4. Gom tất cả các class trên lại thành 1 chuỗi liên tục để gắn vào thẻ button
    const buttonClasses = `
    ${baseStyles} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${dissabled ? 'opacity-50 cursor-not-allowed' : ''} 
    ${className}
    `.trim();
    // 5. Trả về cấu trúc thẻ button của HTML với tất cả đồ nghề đã chuẩn bị ở trên
    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonClasses}
            disabled={dissabled}
        >
            {children}{/* In cái chữ "Đăng nhập", "Mua hàng"... ra giữa nút */}
        </button>
    );
}
export default Button;