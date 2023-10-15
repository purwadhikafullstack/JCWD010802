import { useDispatch, useSelector } from "react-redux"
import headersGen from "../../../api/headers"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import axios from "../../../api/axios";
import { setCart } from "../../../redux/cartSlice";
import { setPrice } from "../../../redux/totalPrice";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai"


export const AddToCartMobile = ({ detail, stock }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [reload, setReload] = useState(0)
    const data = useSelector((state) => state.user.value)
    const token = localStorage.getItem("token")
    const headers = headersGen(token)

    const handleAddToCart = async () => {
        try {
            if(data.isVerified){
                 await axios.post(`/cart/${detail.id}`,
                { quantity: 1 },
                { headers }
                );
                const cartResponse = await axios.get(`/cart`, { headers });
                setReload(!reload);
                dispatch(setCart(cartResponse.data.result))
                dispatch(setPrice(cartResponse.data.Cart.totalPrice))
                toast.success("Product added to cart", { position: "top-center" });
            }
            else {
                toast.error('You are not verified. Verify your account to access more feature.', {
                position: toast.POSITION.TOP_CENTER,              
            })
            setTimeout(() => {
              navigate("/login");
            }, 2500)
            } 
            } catch (error) {
            console.error(error);
            if (error.response) {
                toast({
                title: 'Error',
                description: error.response.data.message, 
                status: 'error',
                duration: 3000,
                isClosable: true,
                });
            } else {
                toast({
                title: 'Error',
                description: 'Failed to add item to cart',
                status: 'error',
                duration: 3000,
                isClosable: true,
                });
            }
        }
    };
    return (
        <Flex w="100vw" position="fixed" bottom={"60px"} h={"60px"} bg={"white"} zIndex={999} p="20px" align="center" justifyContent="space-between">
            <ToastContainer />
            <IconButton icon={<AiOutlineHeart />} variant="outline" borderColor={"#517664"} />
            <Button
                bg={"white"} color={'#517664'} borderColor={"#517664"}
                border={"1px"} _hover={{ bg: {} }}
                w={"40%"}
            > Buy Now
            </Button>
            {data.isVerified ? (
            <Button
              bg={"#517664"} color={'white'} _hover={{ bg: "#2d3319" }} w={"40%"} onClick={handleAddToCart} leftIcon={<AiOutlinePlus />}>
              Cart
            </Button>
          ) : (
            <Button
              bg={"#517664"}
              color={'white'}
              _hover={{ bg: "#2d3319" }}
              w={"40%"}
              onClick={
                handleAddToCart
              }
              leftIcon={<AiOutlinePlus />}
            >
                Cart
            </Button>
            )}
        </Flex>
    )
}