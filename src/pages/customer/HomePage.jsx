import React from 'react';
import Carousel from '../../components/ui/Carousel';
import ProductGrid from '../../components/product/ProductGrid'; // THÊM DÒNG NÀY NÈ
import img1 from "../../assets/Banner/imgBanGhe1.png";
import img2 from "../../assets/Banner/imgBoGheSoFa.png";
import img3 from "../../assets/Banner/imgGheVanPhong.png";

const HomePage = () => {
    const product_LVRoom = [
        {
            id: 1,
            name: "Sofa Giường Ceasar Hiện Đại",
            price: 13600000,
            originalPrice: 16300000,
            image: img1, // Sử dụng biến đã import từ assets
        },
        {
            id: 2,
            name: "Sofa Da Nhập Khẩu Italia",
            price: 25000000,
            originalPrice: 32000000,
            image: img2,
        },
        {
            id: 3,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        },
        {
            id: 4,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        },
        {
            id: 5,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        },
        {
            id: 6,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        },
        {
            id: 7,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        },
        {
            id: 8,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        },
        {
            id: 9,
            name: "Sofa Góc L-Shaped Sang Trọng",
            price: 18000000,
            originalPrice: 22000000,
            image: img3,
        }
    ];
    
    // Mảng dữ liệu bây giờ chỉ cần ID và Ảnh
    const bannerSlides = [
        { id: 1, image: img1 },
        { id: 2, image: img2 },
        { id: 3, image: img3 }
    ];

    const bannerSettings = {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 9000 },
        navigation: false, // Vẫn giữ mũi tên để khách tự bấm chuyển
        pagination: { clickable: true } // Vẫn giữ chấm tròn nhỏ ở dưới
    };

    return (
        <div className="homepage">
            {/* Chiều cao 90vh giúp ảnh to và sang hơn */}
            <div className="banner-section max-w-7xl mx-auto w-full h-[90vh] overflow-hidden">
                <Carousel settings={bannerSettings}>
                    {bannerSlides.map((slide) => (
                        <Carousel.Slide key={slide.id}>
                            <div
                                className="w-full h-full bg-cover bg-center transition-all duration-500"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>
            <div className="product-lists max-w-7xl mx-auto mt-8">

                {/* Phòng khách */}
                <ProductGrid
                    title="Phòng Khách Sang Trọng"
                    products={product_LVRoom}
                />

                {/* Phòng bếp - Chỉ dùng mt-4 hoặc mt-8 thay vì pb-20 */}
                <div className="mt-5">
                    <ProductGrid
                        title="Phòng Bếp Sang Trọng"
                        products={product_LVRoom}
                    />
                </div>

                {/* Nhà hàng - Tương tự */}
                <div className="mt-5">
                    <ProductGrid
                        title="Nhà Hàng & Cafe"
                        products={product_LVRoom}
                    />
                </div>

                {/* Chỉ để pb-20 ở cái cuối cùng để cách chân trang (Footer) */}
                <div className="mt-16 pb-20 text-center text-gray-400 italic">
                    <p>— Khám phá thêm nhiều nội thất đẳng cấp tại LUXVIE —</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;