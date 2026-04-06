import React, { useEffect } from 'react';

// Nhận vào các props để tùy chỉnh Toast
const Toast = ({
    message,          // Nội dung thông báo (VD: "Đăng nhập thành công!")
    type = 'info',    // Loại thông báo: 'success', 'error', 'info', 'warning'
    onClose,          // Hàm gọi để tắt Toast
    duration = 3000   // Thời gian tự động tắt (mặc định 3000ms = 3 giây)
}) => {

    // 1. TỰ ĐỘNG TẮT (Auto-dismiss)
    // Dùng useEffect để đếm ngược thời gian ngay khi Toast xuất hiện
    useEffect(() => {
        // Cài đặt đồng hồ hẹn giờ
        const timer = setTimeout(() => {
            onClose(); // Hết giờ thì gọi hàm tắt
        }, duration);

        // Dọn dẹp đồng hồ nếu component bị hủy trước khi hết giờ (để tránh lỗi bộ nhớ)
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // 2. CHỌN MÀU SẮC THEO LOẠI (Theme)
    const typeStyles = {
        success: "bg-green-50 text-green-800 border-green-500",
        error: "bg-red-50 text-red-800 border-red-500",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-500",
        info: "bg-blue-50 text-blue-800 border-blue-500"
    };

    // 3. CHỌN ICON THEO LOẠI
    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };

    return (
        // 4. GIAO DIỆN CHÍNH
        <div className={`fixed bottom-4 right-4 z-50 flex items-center p-4 min-w-[300px] border-l-4 rounded shadow-lg transition-all duration-300 ${typeStyles[type]}`}>

            {/* Hiện Icon */}
            <span className="text-xl mr-3">{icons[type]}</span>

            {/* Hiện nội dung thông báo */}
            <p className="font-medium flex-grow">{message}</p>

            {/* Nút bấm X để tắt thủ công ngay lập tức (không cần đợi hết 3 giây) */}
            <button
                onClick={onClose}
                className="ml-4 opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
            >
                ✖
            </button>

        </div>
    );
};

export default Toast;