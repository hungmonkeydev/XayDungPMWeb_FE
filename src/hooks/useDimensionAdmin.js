//src/hooks/useDimensionAdmin.js
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://your-api-url.com/api";

export default function useDimensions() {
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/dimensions`).then(res => setDimensions(res.data));
  }, []);

  return dimensions;
}
