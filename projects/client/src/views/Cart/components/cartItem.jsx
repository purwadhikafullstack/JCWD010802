import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Heading,
  Divider,
  Center,
} from '@chakra-ui/react';
import { CartCounter } from './counter';
import { DeleteCart } from './deleteCart';
import formatIDR from '../../../helpers/formatIDR';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setCart } from '../../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { setPrice } from '../../../redux/totalPrice';
import headersGen from '../../../api/headers';
import axios from '../../../api/axios';

export const CartItem = ({ cart, reload, setReload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isInWishlistMap, setIsInWishlistMap] = useState({}); 
  const token = localStorage.getItem('token');
  const headers = headersGen(token)
  const dispatch = useDispatch();

  const checkWishlist = async (productId) => {
    try {
      const response = await axios.get(
        `/cart/is-in-wishlist/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsInWishlistMap((prevState) => ({
        ...prevState,
        [productId]: response.data.isInWishlist,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cart) {
      return;
    }
      if (cart.length > 0) {
      cart.forEach((item) => {
        checkWishlist(item.product.id);
      });
    }
  }, [cart]);
  

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/cart/${itemId}`, { headers });
      const cartResponse = await axios.get(`/cart`, { headers });

      setIsModalOpen(false);
      setItemToDelete(null);
      dispatch(setCart(cartResponse.data.result));
      dispatch(setPrice(cartResponse.data.totalPrice));
      setReload(!reload);

    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      await axios.post(
        `/cart/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const cartResponse = await axios.get(`/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setItemToDelete(null);
      dispatch(setCart(cartResponse.data.result));
      dispatch(setPrice(cartResponse.data.totalPrice));
      setReload(!reload);
  
      toast.success('Product moved to wishlist and removed from the cart', { position: 'top-center' });
    } catch (error) {
      console.log(error);
      toast.error('Failed to move product to wishlist and remove from cart', { position: 'top-center' });
    }
  };
  
  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
    <Flex direction="column" w={{ base: '100%', sm: '80%', md: '60%' }}>
     <Heading>Cart</Heading>
      <Divider borderWidth={4} mt={3} />
      {cart?.length === 0 || !cart ? (
          <Center p={4} borderRadius="md" display="flex" flexDirection={{ base: 'column', md: 'row' }}>
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
                src={`${process.env.REACT_APP_BASE_URL}/productImg/${item.product.productImg}`}
                alt={item.product.name}
                h={{ base: '150px', md: '100px' }}
                w={{ base: '150px', md: '100px' }}
                objectFit="cover"
                borderRadius={'10%'}
              />
              <Box ml={{ base: 0, md: 4 }} flex="1">
                <Text fontSize="xl" fontWeight="bold">
                  {item.product.name}
                </Text>
                <Text mt={2}>Price: {formatIDR(item.product.price)}</Text>
                <Flex justifyContent="space-between" align="center" flexWrap="wrap" gap={2} mt={{ base: 5, md: 10 }}>
                  {isInWishlistMap[item.product.id] ? (
                    <Text color="gray.500" flexBasis={{ base: '100%', md: 'auto' }}>
                      Already in Wishlist
                    </Text>
                  ) : (
                    <Button onClick={() => handleAddToWishlist(item.product.id)} bg="transparent">
                      Move to Wishlist
                    </Button>
                  )}
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
                <Divider borderWidth={4} mt={3} w={'full'} />
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
