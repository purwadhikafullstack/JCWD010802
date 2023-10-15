import { useEffect, useState } from "react";
import axios from "../../../api/axios";

const useIdValidation = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
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
