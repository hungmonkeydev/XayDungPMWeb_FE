import React from 'react';
import Carousel from '../../components/ui/Carousel';
import ProductGrid from '../../components/product/ProductGrid';
import useProducts from '../../hooks/useProducts';
import img1 from "../../assets/Banner/imgBanGhe1.png";
import img2 from "../../assets/Banner/imgBoGheSoFa.png";
import img3 from "../../assets/Banner/imgGheVanPhong.png";

const HomePage = () => {
    // 1. Gọi API 1 lần duy nhất lấy nhiều sản phẩm
    const { products, loading } = useProducts({ limit: 50 });
    
    // 2. Tự dùng Code Frontend tách ra theo Category ID
    const safeProducts = products || [];
    const kitchenProducts = safeProducts.filter(p => p.categoryId === 30003).slice(0, 8);
    const livingRoomProducts = safeProducts.filter(p => p.categoryId === 30002).slice(0, 8);

    const bannerSlides = [
        { id: 1, image: img1 },
        { id: 2, image: img2 },
        { id: 3, image: img3 }
    ];

    const bannerSettings = {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 9000 },
        navigation: false,
        pagination: { clickable: true }
    };

    return (
        <div className="homepage">
            {/* Banner Section */}
            <div className="banner-section max-w-7xl mx-auto w-full h-[90vh] overflow-hidden">
                <Carousel settings={bannerSettings}>
                    {bannerSlides.map((slide) => (
                        <Carousel.Slide key={slide.id}>
                            <div
                                className="w-full h-full bg-cover bg-center transition-all duration-500"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>

            <div className="product-lists max-w-7xl mx-auto mt-8">
                {/* Phòng khách - Dùng chung biến 'loading' */}
                {loading ? <p className="text-center py-10">Đang tải phòng khách...</p> : (
                    <ProductGrid
                        title="Giường ngủ"
                        products={livingRoomProducts}
                        categoryId={30002}
                    />
                )}

                {/* Phòng bếp - Dùng chung biến 'loading' */}
                <div className="mt-5">
                    {loading ? <p className="text-center py-10">Đang tải phòng bếp...</p> : (
                        <ProductGrid
                            title="Bàn Ăn"
                            products={kitchenProducts}
                            categoryId={30003}
                        />
                    )}
                </div>

                <div className="mt-16 pb-20 text-center text-gray-400 italic">
                    <p>— Khám phá thêm nhiều nội thất đẳng cấp tại LUXVIE —</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;