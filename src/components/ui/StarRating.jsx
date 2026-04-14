import React, { useState } from 'react';

const StarRating = ({
    rating = 0,         
    maxRating = 5,      
    readOnly = false,   
    onRatingChange,     
    size = 'md'         
}) => {

    // 1. STATE HIỆU ỨNG: Dùng để nhớ vị trí khách đang rê chuột (hover) tới ngôi sao thứ mấy
    const [hoverRating, setHoverRating] = useState(0);

    // 2. KÍCH THƯỚC:
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    return (
        <div className="flex items-center space-x-1">
            {/* 3. VÒNG LẶP: Tạo ra 5 ngôi sao (từ mảng maxRating) */}
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1; // Giá trị của sao hiện tại (1, 2, 3, 4, 5)

                // 4. LOGIC TÔ MÀU SAO (Quan trọng nhất):
                const isFilled = (hoverRating || rating) >= starValue;

                return (
                    <button
                        key={starValue}
                        type="button"
                        disabled={readOnly} // Nếu readOnly = true thì khóa nút, cấm click
                        className={`transition-colors duration-200 focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
                            }`}

                        // Các sự kiện tương tác (chỉ chạy nếu KHÔNG phải chế độ readOnly)
                        onClick={() => !readOnly && onRatingChange && onRatingChange(starValue)}
                        onMouseEnter={() => !readOnly && setHoverRating(starValue)}
                        onMouseLeave={() => !readOnly && setHoverRating(0)}
                    >
                        {/* Vẽ ngôi sao bằng mã SVG */}
                        <svg
                            className={`${sizes[size]} ${isFilled ? 'text-yellow-400' : 'text-gray-300' // isFilled = true thì tô vàng, false thì tô xám
                                } transition-colors`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;