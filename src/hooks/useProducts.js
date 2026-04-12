import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (params = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Cắm cờ

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://xaydungwebnoithat-backend.onrender.com/api/products", {
                    params: {
                        page: 1,
                        limit: 10,
                        sortBy: "createdAt",
                        sortOrder: "DESC",
                        ...params 
                    }
                });

                if (isMounted) {
                    const result = response.data;
                    setProducts(result.data || result);
                    setError(null); // Xóa lỗi cũ nếu lần này thành công
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response?.data?.message || err.message || "Có lỗi xảy ra");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        // Cleanup function: Khi component bị tắt, hạ cờ xuống
        return () => {
            isMounted = false;
        };
    }, [JSON.stringify(params)]);

    return { products, loading, error };
};

export default useProducts;