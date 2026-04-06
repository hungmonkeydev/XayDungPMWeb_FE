import React from 'react';

const Pagination = ({
    currentPage,   // Trang hiện tại đang đứng (VD: Trang 2)
    totalPages,    // Tổng số trang (VD: 10 trang)
    onPageChange   // Hàm xử lý khi khách hàng bấm chuyển trang
}) => {

    // 1. CHỐT CHẶN: Nếu dữ liệu ít, chỉ có 1 trang (hoặc 0 trang) thì ẩn luôn thanh phân trang cho gọn
    if (totalPages <= 1) return null;

    // 2. Tạo ra một mảng các số từ 1 đến totalPages để in ra các nút bấm
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">

            {/* 3. NÚT "TRANG TRƯỚC" */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1} // Khóa nút nếu đang ở trang 1
                className={`px-3 py-1 rounded border transition-colors ${currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' // Style khi bị khóa
                        : 'text-amber-700 border-amber-200 hover:bg-amber-100'              // Style bình thường
                    }`}
            >
                &laquo; Trước
            </button>

            {/* 4. CÁC NÚT SỐ TRANG (1, 2, 3...) */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${currentPage === page
                            ? 'bg-amber-700 text-white border-amber-700 font-bold' 
                            : 'text-amber-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* 5. NÚT "TRANG SAU" */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages} // Khóa nút nếu đang ở trang cuối cùng
                className={`px-3 py-1 rounded border transition-colors ${currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
                        : 'text-amber-700 border-amber-200 hover:bg-amber-100' // ĐÃ SỬA: Đổi blue thành amber ở đây
                    }`}
            >
                Sau &raquo;
            </button>

        </div>
    );
};

export default Pagination;