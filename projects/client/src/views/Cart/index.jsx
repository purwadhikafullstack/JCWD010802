import { CartItem } from "./components/cartItem"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { CartCheckout } from "./components/cartCheckout";
export const CartView = () => {
    const token = localStorage.getItem("token");
    const [cart,setCart] = useState([])
    const [total,setTotal] = useState([])
    const [reload,setReload] = useState(0)
  
    const getCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(response.data.result)
        setTotal(response.data.totalPrice)
      } catch (error) {
        console.error(error);
      }
    }
    
  
    useEffect(() => {
      getCart();
    },[reload])
    return(
        <Box pt={20} minH={"100vh"} px={{base: "20px", lg: "50px"}}maxW="100vw">
        <Flex justifyContent={"center"} py={10}>
        <CartItem cart={cart} reload={reload} setReload={setReload}/>
        <CartCheckout cart={cart}  total={total}/>
        </Flex>
        </Box>
    )
}