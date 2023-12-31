import { CartItem } from "./components/cartItem";
import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Stack, VStack } from "@chakra-ui/react";
import { CartCheckout } from "./components/cartCheckout";
import axios from "../../api/axios";
import headersGen from "../../api/headers";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const CartView = () => {
    const token = localStorage.getItem("token");
    const headers = headersGen(token)
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState([]);
    const [total, setTotal] = useState([]);
    const [reload, setReload] = useState(0);
    const totals = useSelector((state) => state.total.value);
console.log(total);
    const carts = useSelector(state=>state.cart.value)

    const getCart = async () => {
        try {
            const response = await axios.get(`/cart`, { headers });
            if (response.data) {
                setCart(response.data.result);
                setCartId(response.data.Cart.id);
                setTotal(response.data.totalPrice);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user cart!")
        }
    }

    useEffect(() => {
        getCart();
    }, [reload]);
console.log(totals);
    return (
        <Box pt={20} minH={"100vh"} px={{ base: "20px", lg: "50px" }} maxW="100vw" >
            <Flex justifyContent={"center"} py={10} direction={{ base: "column", md: "row" }} gap={5}>
                <CartItem cart={cart} reload={reload} setReload={setReload} />
                {totals ===0 ?(  
                    null
                    ):(
                    <CartCheckout cart={cart} total={total} cartId={cartId} />
                )}
            </Flex>
        </Box>
    );
};
