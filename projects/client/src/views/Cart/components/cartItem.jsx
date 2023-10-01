import React, { useState } from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  HStack,
  Heading,
  Divider,
  Center,
} from '@chakra-ui/react';
import { CartCounter } from './counter';
import { DeleteCart } from './deleteCart';
import formatIDR from '../../../helpers/formatIDR';
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../redux/cartSlice';
import { toast } from 'react-toastify';
import { setPrice } from '../../../redux/totalPrice';

export const CartItem = ({ cart, reload, setReload }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const cartResponse = await axios.get(`http://localhost:8000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsModalOpen(false);
      setItemToDelete(null);
      dispatch(setCart(cartResponse.data.result));
      dispatch(setPrice(cartResponse.data.totalPrice));
      setReload(!reload);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Flex direction="column" w={{ base: '100%', sm: '80%', md: '60%' }}>
     <Heading>Cart</Heading>
      <Divider borderWidth={4} mt={3} />
      {cart.length === 0 ? (
        <Center>
          <Image
            src="https://img.freepik.com/free-vector/add-cart-concept-illustration_114360-1435.jpg?w=740&t=st=1695704262~exp=1695704862~hmac=3b04c76b1390720ab571e66d6ac6ed8b08c68314607cb6f7c70349c5a6bfecd4"
            boxSize={{ base: '100%', md: 'lg' }}
          />
          <Heading>Your cart is empty, Let's go shopping</Heading>
        </Center>
      ) : (
        cart.map((item) => (
          <Box p={4} borderRadius="md" display="flex" flexDirection={{ base: 'column', md: 'row' }}>
            <Image
              src={`http://localhost:8000/productImg/${item.product.productImg}`}
              alt={item.product.name}
              h={{ base: '150px', md: '100px' }}
              w={{ base: '150px', md: '100px' }}
              objectFit="cover"
              borderRadius={"10%"}
              />
            <Box ml={{ base: 0, md: 4 }} flex="1">
              <Text fontSize="xl" fontWeight="bold">
                {item.product.name}
              </Text>
              <Text mt={2}>Price: {formatIDR(item.product.price)}</Text>
              <Flex justifyContent="space-between" align="center" flexWrap="wrap" gap={2} mt={{ base: 5, md: 10 }}>
                <Text color="gray.500" flexBasis={{ base: '100%', md: 'auto' }}>
                  Move to Wishlist
                </Text>
                <Divider orientation="vertical" h={6} borderWidth={2} display={{ base: 'none', md: 'block' }} />
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                    setItemToDelete(item.productId);
                  }}
                  bg="transparent"
                >
                  <BsFillTrash3Fill size="15px" />
                </Button>
                <CartCounter initialCount={item.quantity} productId={item.productId} cartId={item.id} />
              </Flex>
            <Divider borderWidth={4} mt={3} w={"full"} />
            </Box>
          </Box>
        ))
      )}
      <DeleteCart
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onDelete={() => handleDelete(itemToDelete)}
      />

    </Flex>
          </>
  );
};
