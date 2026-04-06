import React from 'react';

// Component Modal nhận vào 4 props cơ bản
const Modal = ({
    isOpen,   // Trạng thái: true (hiện Modal) hoặc false (ẩn Modal)
    onClose,  // Hàm để chạy khi bấm nút X hoặc bấm ra ngoài nền đen
    title,    // Tiêu đề của hộp thoại (VD: "Xác nhận xóa", "Đăng nhập")
    children  // Nội dung chính bên trong hộp thoại
}) => {

    // 1.Nếu isOpen là false thì return null luôn, tức là React sẽ không vẽ cái gì ra màn hình cả.
    if (!isOpen) return null;

    return (
        // 2. LỚP OVERLAY (Nền đen mờ)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">

            {/* 3. HỘP MODAL CHÍNH */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col">

                {/* 4. PHẦN HEADER CỦA MODAL (Chứa Tiêu đề và Nút X) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h3>

                    {/* Nút Đóng (Dấu X) */}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors focus:outline-none"
                        aria-label="Đóng"
                    >
                        {/* Vẽ cái icon dấu X bằng SVG cho đẹp và nhẹ, khỏi cần cài thư viện */}
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 5. PHẦN BODY CỦA MODAL (Nội dung tự do) */}
                <div className="px-6 py-4">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;