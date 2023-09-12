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
import copyToClipboard from '../../../helpers/copyToClipboard';
import { Counter } from './counter';
import { CartFooter } from './cartFooter';
export const AddToCart  = () => {
  const price = 4000
  const name = "doraemon"
  const stock = 8
  const [count, setCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const handleCountChange = (newCount) => {
    setCount(newCount);
    setSubtotal(newCount * price);
  };
  const currentURL = window.location.href;
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
      width="300px"
      bg={'white'}
    >
      <Image src={"https://www.akseleran.co.id/blog/wp-content/uploads/2022/10/download-1.png"} alt='#' h="70px" objectFit="cover" />
      <Text mt={2} fontSize="lg" fontWeight="semibold">
        {name}
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
      <Button
        bg={"#517664"} m={2}color={'white'} _hover={{bg:"#2d3319"}} w={"120px"}
        >
        + Cart
      </Button>
        </HStack>

        <CartFooter copylink={currentURL}/>
    </Box>
        </>
    )
}