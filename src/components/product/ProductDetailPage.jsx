import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";  // Đã sửa: Dùng "./" cho import cùng thư mục
import Button from "../ui/Button";        // Import này đúng (đi lên src/components/ui/)
import img from "../../assets/products/imgBoBanGhe1.png";
import img2 from "../../assets/products/imgBoBanGhe2.png";

const productList = [
    {
        id: 1,
        sku: 'LUSF09',
        name: 'Sofa Giường Ceasar Hiện Đại',
        price: 13600000,
        originalPrice: 16300000,
        image: img,
        size: 'Văng: 2100*900*920mm',
    },
    {
        id: 2,
        sku: 'LUSF10',
        name: 'Sofa Da Nhập Khẩu Italia',
        price: 25000000,
        originalPrice: 32000000,
        image: img2,
        size: 'Văng: 2200*950*920mm',
    },
    {
        id: 3,
        sku: 'LUSF11',
        name: 'Sofa Góc L-Shaped Sang Trọng',
        price: 18000000,
        originalPrice: 22000000,
        image: img2,
        size: 'Góc: 2800*1800*920mm',
    }
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('description');
    const productId = Number(id);
    const product = useMemo(
        () => productList.find((item) => item.id === productId) || productList[0],
        [productId]
    );
    const [selectedImage, setSelectedImage] = useState(product.image);
    const thumbnails = [product.image, img2, img];

    useEffect(() => {
        setSelectedImage(product.image);
    }, [product.image]);

    // Dữ liệu mẫu (Mock data) cho danh sách "Sản phẩm cùng loại"
    const relatedProducts = [
        { id: 1, name: 'Ghế sofa thư giãn bập bênh Falcon', price: 5400000, originalPrice: 6850000, image: img },
        { id: 2, name: 'Ghế sofa thư giãn bập bênh Malcom', price: 5500000, originalPrice: 6350000, image: img },
        { id: 3, name: 'SOFA CHỈNH ĐIỆN AIDAN', price: 23000000, originalPrice: 30300000, image: img },
        { id: 4, name: 'SOFA CHỈNH ĐIỆN ARCADIA', price: 23000000, originalPrice: 30300000, image: img },
        { id: 5, name: 'SOFA GÓC CHỈNH ĐIỆN ALBERTO', price: 25000000, originalPrice: 32000000, image: img },
    ];

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-12">
            <div className="max-w-7xl mx-auto px-4 pt-4">

                {/* ================= 1. BREADCRUMB (Đường dẫn) ================= */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white p-3 rounded-md shadow-sm">
                    <span className="text-amber-500 font-medium cursor-pointer">🏠 Trang chủ</span>
                    <span>›</span>
                    <span className="cursor-pointer hover:text-amber-500">SOFA THÔNG MINH</span>
                    <span>›</span>
                        <span className="text-gray-800">{product.name}</span>
                    {/* Cột Trái: Ảnh sản phẩm */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                            <img
                                src={selectedImage}
                                alt="Sofa Giường Ceasar"
                                className="w-full h-full object-cover"
                            />
                            {/* Nút Next ảnh (mũi tên vàng) */}
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-amber-500 hover:bg-amber-500 hover:text-white transition opacity-0 group-hover:opacity-100">
                                ❯
                            </button>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {thumbnails.map((thumb, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedImage(thumb)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === thumb ? 'border-2 border-amber-500' : 'border border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img
                                        src={thumb}
                                        alt={`Ảnh phụ ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cột Phải: Chi tiết thông tin */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <h1 className="text-2xl font-bold text-amber-500 uppercase mb-4 pb-4 border-b border-gray-100">
                            {product.name}
                        </h1>

                        {/* Bảng thông tin cơ bản */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6">
                            <div><span className="text-gray-600">Tình trạng:</span> <span className="text-green-600 font-medium">Còn hàng</span></div>
                            <div><span className="text-gray-600">Thương hiệu:</span> <span className="font-medium">LUXVIE</span></div>
                            <div><span className="text-gray-600">Mã SKU:</span> <span className="font-medium">{product.sku}</span></div>
                            <div><span className="text-gray-600">Loại:</span> <span className="font-medium">SOFA THÔNG MINH</span></div>
                        </div>

                        {/* Khối mô tả ngắn */}
                        <div className="text-gray-700 text-sm space-y-4">
                            <p className="font-bold">{product.name}</p>
                            <p className="italic">(Vui lòng chọn kích thước và chất liệu bên dưới để xem giá)</p>
                            <p><span className="font-bold">Mã sản phẩm:</span> {product.sku}</p>

                            <p className="font-bold mt-4">Kích thước:</p>
                            <p>- {product.size}</p>

                            <p className="font-bold mt-4">Chất liệu có thể chọn sản xuất sp mới:</p>
                            <p>Da công nghiệp/Nỉ/Microfiber/Carola/Da bò Italia</p>

                            <p className="font-bold mt-4">Màu sắc đa đa dạng:</p>
                            <ul className="space-y-2 list-none">
                                <li>- Da bò thật cao cấp Italia hơn 30 màu</li>
                                <li>- Da công nghiệp/Nỉ/Microfiber/Carola cao cấp hơn 100 màu</li>
                                <li className="italic text-gray-500">- Giá thay đổi phụ thuộc vào KÍCH THƯỚC, CHẤT LIỆU như bên dưới.</li>
                            </ul>

                            <p className="text-gray-500">Hashtag: #FD...</p>
                        </div>
                    </div>
                </div>

                {/* ================= 3. PHẦN MIDDLE: TAB MÔ TẢ & KHUYẾN MÃI ================= */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">

                    {/* Box Tabs Mô tả / Bảo hành */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`px-6 py-2.5 font-bold text-sm transition-colors ${activeTab === 'description' ? 'bg-[#d69f28] text-white' : 'bg-[#4a4a4a] text-white hover:bg-gray-600'}`}
                            >
                                MÔ TẢ
                            </button>
                            <button
                                onClick={() => setActiveTab('warranty')}
                                className={`px-6 py-2.5 font-bold text-sm transition-colors ${activeTab === 'warranty' ? 'bg-[#d69f28] text-white' : 'bg-[#4a4a4a] text-white hover:bg-gray-600'}`}
                            >
                                PHẠM VI BẢO HÀNH
                            </button>
                        </div>
                        <div className="text-gray-600 text-sm leading-relaxed min-h-[150px]">
                            {activeTab === 'description' ? (
                                <p>Nội dung mô tả chi tiết sản phẩm sẽ nằm ở đây. Sofa giường Ceasar mang lại trải nghiệm tuyệt vời cho không gian phòng khách của bạn...</p>
                            ) : (
                                <p>Thông tin bảo hành: Bảo hành khung gỗ 5 năm, đệm mút 3 năm. Lỗi 1 đổi 1 trong vòng 7 ngày do nhà sản xuất...</p>
                            )}
                        </div>
                    </div>

                    {/* Banner Vận chuyển (Bên phải) */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-[#fffdf8] border border-amber-200 rounded-xl p-6 h-full flex flex-col justify-center shadow-sm relative overflow-hidden">
                            <div className="flex gap-4 items-center z-10">
                                <div className="w-16 h-16 bg-white border border-amber-200 rounded-lg flex items-center justify-center shrink-0">
                                    <span className="text-3xl">📦</span> {/* Thay bằng Icon túi xách thực tế */}
                                </div>
                                <div>
                                    <p className="text-gray-700 text-sm mb-3">Hóa đơn trên <span className="text-amber-500 font-bold">5,000,000đ</span> để được miễn phí vận chuyển</p>
                                    <Button variant="secondary" className="!bg-[#eedca8] !text-white hover:!bg-[#e3c77d] px-6 py-2 text-sm">
                                        🎁 Nhận ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Khung Đánh giá sản phẩm */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-amber-500 mb-4 pb-2 border-b border-gray-100">
                        Đánh giá sản phẩm
                    </h2>
                    <div className="text-center text-gray-400 py-10">
                        Chưa có đánh giá nào cho sản phẩm này.
                    </div>
                </div>

                {/* ================= 4. PHẦN BOTTOM: SẢN PHẨM CÙNG LOẠI ================= */}
                <div className="bg-white rounded-xl shadow-sm p-6">

                    {/* Header màu vàng đặc trưng */}
                    <div className="flex justify-between items-end border-b-2 border-amber-500 mb-6 pb-2">
                        {/* Tạo khối shape màu vàng bo góc */}
                        <h2 className="bg-amber-500 text-white font-bold text-lg py-2 px-6 rounded-t-lg relative bottom-[-2px]">
                            Sản phẩm cùng loại
                        </h2>
                        <a href="#" className="text-sm text-gray-600 hover:text-amber-500 font-medium flex items-center gap-1 mb-1">
                            Xem tất cả ❯
                        </a>
                    </div>

                    {/* Grid chứa các ProductCard */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {relatedProducts.map((product) => (
                            // Gọi Component ProductCard đã tái sử dụng ở đây
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;