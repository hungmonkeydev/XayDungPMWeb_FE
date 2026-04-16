//src/hooks/useColorAdmin.js
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://your-api-url.com/api";

export default function useColors() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/colors/active`).then(res => {
      const mapped = res.data.map(c => ({
        id: c.id,
        name: c.name,
        hex: c.hexCode
      }));
      setColors(mapped);
    });
  }, []);

  return colors;
}
