import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

export default function useCategories() {
  const token = useSelector(state => state.auth.token);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Lỗi load categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  return { categories, loading };
}
