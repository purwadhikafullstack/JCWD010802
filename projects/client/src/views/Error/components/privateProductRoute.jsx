import axios from "axios";
import { useEffect, useState } from "react";

const useIdValidation = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(response.data.result || null); 
      } catch (error) {
        console.log(error);
        setProduct(null); 
      }
    };

    getProduct();
  }, [id]);

  return product; 
};

export default useIdValidation;
