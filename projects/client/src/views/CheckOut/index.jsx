import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CardCheckout } from "./components/CardCheckout";
import { useNavigate } from "react-router-dom";


export const CheckoutView = () => {
  const cart = useSelector((state) => state.cart.value);
  const navigate = useNavigate();


  useEffect(() => {
    if (!cart || cart.length === 0) {
    
      navigate("/cart"); 

    }
  }, [cart]);

  return (
    <>
      <CardCheckout />
    </>
  );
};
