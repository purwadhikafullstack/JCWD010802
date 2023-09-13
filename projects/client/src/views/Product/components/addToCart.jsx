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
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export const AddToCart  = ({detail,stock}) => {
  const [count, setCount] = useState(0);
  const [reload,setReload] =useState(0)
  const [subtotal, setSubtotal] = useState(0);
  const handleCountChange = (newCount) => {
    setCount(newCount);
    setSubtotal(newCount * detail.price);
  };
  const data = useSelector((state) => state.user.value);
  const currentURL = window.location.href;
  const token = localStorage.getItem("token")
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/cart/${detail.id}`, 
       { quantity: count},  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReload(!reload)
      toast.success("Product added to cart",{position:"top-center"})
  
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
    return(
        <>
         <Box
         mt={4}
         mx={"auto"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      h={"fit-content"}
      width="300px"
      bg={'white'}
    >
      <Image src={`http://localhost:8000/productImg/${detail.productImg}`} alt='#' h="70px" objectFit="cover" />
      <Text mt={2} fontSize="lg" fontWeight="semibold">
        {detail.name}
      </Text>
      <HStack mt={2}>
      <Counter onCountChange={handleCountChange} stock={stock}/>
      <Flex gap={1}>
      <Text>Total Stock: </Text>
      <Text fontWeight={"bold"}>{stock}</Text>
      </Flex>
      </HStack>

      <HStack justifyContent={"space-between"} mt={3}>
        <Text  fontSize="sm" color="gray.600">
          Subtotal
        </Text>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        {formatIDR(subtotal)}
      </Text>
      </HStack>
    
      <HStack justifyContent={"space-between"} mx={3} mt={2}>
      <Button
       bg={"white"} m={2}color={'#517664'} borderColor={"#517664"}
       border={"1px"} _hover={{bg:{}}}
        w={"120px"}
        > Buy Now  
        </Button>
        {data.isVerified?(
      <Button
        bg={"#517664"} m={2}color={'white'} _hover={{bg:"#2d3319"}} w={"120px"} onClick={handleAddToCart}>
        + Cart
      </Button>

        ):(
          <Button
          bg={"#517664"}
          m={2}
          color={'white'}
          _hover={{ bg:"#2d3319" }}
          w={"120px"}
          onClick={() => {
            window.location.href = '/login';
          }}
        >
          + Cart
        </Button>
          
        )}
        </HStack>

        <CartFooter copylink={currentURL}/>
    </Box>
        </>
    )
}