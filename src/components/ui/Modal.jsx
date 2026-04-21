import React from 'react';
const Modal = ({
    isOpen,   
    onClose,  
    title,    
    children  
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