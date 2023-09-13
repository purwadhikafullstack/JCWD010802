import { CartItem } from "./components/cartItem"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Heading } from "@chakra-ui/react";
import { CartCheckout } from "./components/cartCheckout";
export const CartView = () => {
    const token = localStorage.getItem("token");
    const [cart,setCart] = useState([])
  
    const getCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(response.data.result)
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      getCart();
    },[])
    return(
        <Box pt={20}>
        <Heading>Cart</Heading>
        <Flex justifyContent={"center"} gap={5}>
        <CartItem cart={cart}/>
        <CartCheckout cart={cart}/>
        </Flex>
        </Box>
    )
}