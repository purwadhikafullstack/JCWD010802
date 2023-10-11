import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  useToast,
  useColorModeValue,
  HStack,
  Spacer,
  Flex,
  CardFooter,
} from '@chakra-ui/react';
import formatIDR from '../../../helpers/formatIDR';
import { Counter } from './counter';
import { CartFooter } from './cartFooter';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setCart } from '../../../redux/cartSlice';
import { setPrice } from '../../../redux/totalPrice';
import headersGen from '../../../api/headers';
import axios from '../../../api/axios';

export const AddToCart = ({ detail, stock }) => {
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getStockColor = () => {
    if (stock < 5) {
      return 'red'; 
    } else if (stock < 10) {
      return 'orange'; 
    } else {
      return 'green'; 
    }
  };

  const stockColor = getStockColor();

  const handleCountChange = (newCount) => {
    setCount(newCount);
    setSubtotal(newCount * detail.price);
  };

  const data = useSelector((state) => state.user.value);
  const currentURL = window.location.href;
  const token = localStorage.getItem("token")
  const headers = headersGen(token)

  const handleAddToCart = async () => {
    try {
      if(data.isVerified){

        const response = await axios.post(`/cart/${detail.id}`,
        { quantity: count },
        { headers }
        );
        const cartResponse = await axios.get(`/cart`, { headers });
        setReload(!reload);
        dispatch(setCart(cartResponse.data.result))
        dispatch(setPrice(cartResponse.data.Cart.totalPrice))
        toast.success("Product added to cart", { position: "top-center" });
      }
      else{
        toast.error('You are not verified. Verify your account to access more feature.', {
          position: toast.POSITION.TOP_CENTER,
          
          
        })
        setTimeout(() => {
          navigate("/login");
        }, 2500);;
    } }catch (error) {
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
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={4}
        h={"fit-content"}
        width="320px"
        bg={'white'}
      >
        <Image src={`http://localhost:8000/productImg/${detail.productImg}`} alt='#' h="70px" objectFit="fill" w={"70px"} borderRadius={"10%"}/>
        <Text mt={2} fontSize="lg" fontWeight="semibold">
          {detail.name}
        </Text>
        <Flex mt={2} justifyContent={"space-between"}>
          <Counter onCountChange={handleCountChange} stock={stock} />
          <Flex >
            <Text>Stock:</Text>
            <Text fontWeight={"bold"} color={stockColor} ml={1}> {stock}</Text>
          </Flex>
        </Flex>

        <HStack justifyContent={"space-between"} mt={3}>
          <Text fontSize="sm" color="gray.600">
            Subtotal
          </Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {formatIDR(subtotal)}
          </Text>
        </HStack>

        <HStack justifyContent={"space-between"} mx={3} mt={2}>
          <Button
            bg={"white"} m={2} color={'#517664'} borderColor={"#517664"}
            border={"1px"} _hover={{ bg: {} }}
            w={"120px"}
          > Buy Now
          </Button>
          {data.isVerified ? (
            <Button
              bg={"#517664"} m={2} color={'white'} _hover={{ bg: "#2d3319" }} w={"120px"} onClick={handleAddToCart}>
              + Cart
            </Button>
          ) : (
            <Button
              bg={"#517664"}
              m={2}
              color={'white'}
              _hover={{ bg: "#2d3319" }}
              w={"120px"}
              onClick={
                handleAddToCart
              }
            >
              + Cart
            </Button>
          )}
        </HStack>

        <CartFooter copylink={currentURL} />
      </Box>
    </>
  )
}
