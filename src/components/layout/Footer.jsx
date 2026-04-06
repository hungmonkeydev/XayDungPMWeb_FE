import React from 'react';
import imgPayment from "../../assets/image.png";
const Footer = () => {
    return (
        <footer className="bg-[#f8f8f8] pt-12 pb-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">

                {/* TẦNG TRÊN: CHIA 5 CỘT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">

                    {/* CỘT 1: THÔNG TIN LIÊN HỆ */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <h1 className="text-3xl font-serif font-bold tracking-widest text-gray-800">
                                <span className="text-amber-500 mr-1">V</span>LUXVIE
                            </h1>
                        </div>
                        <div className="text-gray-500 text-sm space-y-3 leading-relaxed">
                            <p><strong>Địa chỉ:</strong> S1.07 01S05 Vinhomes Grand Park Khu dân cư và Công viên Phước Thiện, Số 512 Nguyễn Xiển, Long Bình, TP. Hồ Chí Minh</p>
                            <p><strong>Điện thoại:</strong> 0902216661</p>
                            <p><strong>Hotline:</strong> 0886631116 - 0886784838</p>
                            <p><strong>Website:</strong> https://luxvie.vn</p>
                            <p><strong>Email:</strong> luxviefurniture@gmail.com</p>

                        </div>
                    </div>

                    {/* CỘT 2: CHÍNH SÁCH */}
                    <div>
                        <h3 className="font-bold text-gray-700 mb-6 uppercase text-sm tracking-widest">Chính sách</h3>
                        <ul className="text-gray-500 text-sm space-y-3">
                            <li><a href="#" className="hover:text-amber-600 transition-colors">Chính sách mua hàng</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors">Chính sách vận chuyển</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors">Chính sách bảo hành</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors">Chính sách bảo mật</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors">Chính sách thanh toán</a></li>
                        </ul>
                    </div>

                    {/* CỘT 3: LIÊN KẾT NHANH */}
                    <div>
                        <h3 className="font-bold text-gray-700 mb-6 uppercase text-sm tracking-widest">Liên kết nhanh</h3>
                        <ul className="text-gray-500 text-sm space-y-3">
                            <li><a href="#" className="hover:text-amber-600">Ghế Ăn Bọc Da</a></li>
                            <li><a href="#" className="hover:text-amber-600">Ghế Hồ Bơi</a></li>
                            <li><a href="#" className="hover:text-amber-600">Ghế Công Viên</a></li>
                            <li><a href="#" className="hover:text-amber-600">Bàn Ăn Mặt Đá</a></li>
                            <li><a href="#" className="hover:text-amber-600">Bộ Bàn Ghế Cafe</a></li>
                            <li><a href="#" className="hover:text-amber-600">Ergonomic</a></li>
                        </ul>
                    </div>

                    {/* CỘT 4: NHẬN EMAIL */}
                    <div>
                        <h3 className="font-bold text-gray-700 mb-6 uppercase text-sm tracking-widest">Nhận email khuyến mãi</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ Email của bạn"
                                className="w-full px-4 py-3 border border-gray-300 outline-none focus:border-amber-500 text-sm bg-white"
                            />
                            <button className="w-full bg-[#e3ae3c] hover:bg-amber-600 text-white font-bold py-3 uppercase text-sm transition-all shadow-sm">
                                Đăng ký
                            </button>
                        </div>
                    </div>

                    {/* CỘT 5: FANPAGE */}
                    <div>
                        <h3 className="font-bold text-gray-700 mb-6 uppercase text-sm tracking-widest">Fanpage</h3>
                        <div className="border border-gray-200 bg-white p-2">
                            <div className="flex items-start space-x-2">
                                <div className="w-12 h-12 bg-amber-500 flex items-center justify-center font-bold text-white text-xl">V</div>
                                <div>
                                    <a href="#" className="text-blue-700 font-bold text-sm block hover:underline">Nội Thất Luxvie</a>
                                    <p className="text-gray-500 text-[11px]">5.412 người theo dõi</p>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button className="bg-gray-100 border border-gray-300 text-xs px-2 py-1 flex items-center font-bold">
                                    <i className="fab fa-facebook-square mr-1"></i> Theo dõi Trang
                                </button>
                                <button className="bg-gray-100 border border-gray-300 text-xs px-2 py-1 flex items-center font-bold">
                                    <i className="fas fa-share mr-1"></i> Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TẦNG DƯỚI: COPYRIGHT & THANH TOÁN */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-xs">
                    <p>© Bản quyền thuộc về <span className="font-bold">MewTheme</span> | Cung cấp bởi <span className="font-bold">Haravan</span></p>
                    <div className="flex items-center space-x-2 grayscale opacity-70">
                        <img src={imgPayment} alt="Phương thức thanh toán" className="h-6" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;