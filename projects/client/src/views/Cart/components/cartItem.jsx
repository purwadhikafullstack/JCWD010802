import React, { useState } from 'react';
import { Box, Text, Image, Button, Flex, HStack, Heading, Divider } from '@chakra-ui/react';
import { Counter } from '../../Product/components/counter';
import { CartCounter } from './counter';
import { DeleteCart } from './deleteCart';
import formatIDR from '../../../helpers/formatIDR';
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';

export const CartItem = ({ cart,reload,setReload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
 
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      setIsModalOpen(false);
      setItemToDelete(null)
      setReload(!reload)
  
    
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <Flex direction="column" w={"60%"}>
        <Heading>Cart</Heading>
        <Divider borderWidth={4} mt={3}/>
      {cart.map((item) => (
        <>
        <Box
          key={item.id}
          p={4}
          borderRadius="md"
          display="flex"
          flexDirection="row"
        >
          <Image src={`http://localhost:8000/productImg/${item.product.productImg}`} alt={item.product.name} h="100px" w="100px" objectFit={"cover"}/>
          <Box ml={4} flex="1">
            <Text fontSize="xl" fontWeight="bold">
              {item.product.name}
            </Text>
            <Text mt={2}>Price: {formatIDR( item.product.price)}</Text>
            <HStack justifyContent={"flex-end"} gap={8} mt={10}>
              <Text color={"gray.500"}>Move to Wishlist</Text>
              <Divider orientation='vertical' h={6} borderWidth={2}/>
              <Button
            onClick={() => {
            setIsModalOpen(true);
            setItemToDelete(item.productId)
            }}
            bg={"transparent"}
          >
            <BsFillTrash3Fill size={"15px"}/>
          </Button>       
           <CartCounter initialCount={item.quantity} productId={item.productId}/>
        </HStack>
          </Box>
        </Box>
          <Divider borderWidth={4}/>
      </>
      ))}
  <DeleteCart
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
  }}
  onDelete={() => handleDelete(itemToDelete)}
/>
    </Flex>
  );
};
