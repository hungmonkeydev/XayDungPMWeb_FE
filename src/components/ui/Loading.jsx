import React from 'react';

// Component Loading nhận 3 props cơ bản
const Loading = ({
    size = 'md',        // Kích thước: sm (nhỏ), md (vừa), lg (to)
    color = 'primary',  // Màu sắc: primary (xanh), white (trắng - dùng trong nút nền đậm), gray (xám)
    fullScreen = false  // Trạng thái: true (che mờ toàn màn hình), false (chỉ xoay ở một chỗ)
}) => {

    // 1. Cấu hình kích thước
    const sizes = {
        sm: 'w-4 h-4',   // Vừa vặn để nhét vào trong nút bấm
        md: 'w-8 h-8',   // Dùng để load danh sách sản phẩm
        lg: 'w-12 h-12'  // Dùng khi load nguyên một trang lớn
    };

    // 2. Cấu hình màu sắc
    const colors = {
        primary: 'text-amber-700',
        white: 'text-white',
        gray: 'text-gray-500'
    };

    // 3. Vẽ cái vòng xoay bằng thẻ SVG của HTML
    // Class 'animate-spin' của Tailwind là "phép thuật" làm cái SVG này xoay tròn liên tục
    const SpinnerSVG = (
        <svg
            className={`animate-spin ${sizes[size]} ${colors[color]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            {/* Vòng tròn mờ phía sau */}
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            {/* Cung tròn đậm xoay phía trước */}
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );

    // 4. Nếu truyền prop fullScreen = true
    if (fullScreen) {
        return (
            // Phủ một lớp nền trắng mờ (bg-white/80) đè lên toàn bộ màn hình (fixed inset-0 z-50)
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {SpinnerSVG}
            </div>
        );
    }

    // 5. Nếu dùng bình thường (fullScreen = false)
    return (
        <div className="flex justify-center items-center p-4">
            {SpinnerSVG}
        </div>
    );
};

export default Loading;