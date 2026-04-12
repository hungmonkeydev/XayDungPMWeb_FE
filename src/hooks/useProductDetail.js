// src/hooks/useProductDetail.js
import { useState, useEffect } from "react";
import axios from "axios";

const useProductDetail = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        let isMounted = true;

        const fetchDetail = async () => {
            try {
                setLoading(true);
                // API lấy chi tiết thường là /products/{id}
                const response = await axios.get(`https://xaydungwebnoithat-backend.onrender.com/api/products/${id}`);
                if (isMounted) {
                    setProduct(response.data);
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDetail();
        return () => { isMounted = false; };
    }, [id]);

    return { product, loading, error };
};
export default useProductDetail;