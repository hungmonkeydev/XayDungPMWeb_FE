import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <div className="bg-[#fff9e6] border border-amber-200 text-gray-700 p-4 rounded-md shadow-sm">
            Không có sản phẩm nào. Quay lại <Link to="/" className="font-bold hover:text-amber-600 transition-colors">cửa hàng</Link> để tiếp tục mua sắm.
        </div>
    );
};

export default EmptyCart;