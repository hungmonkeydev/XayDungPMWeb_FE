//src/hooks/useCategoryAdmin.js
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}/categories`);

        setCategories(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { categories, loading };
}
