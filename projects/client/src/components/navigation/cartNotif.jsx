import React, { useEffect, useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

export const CartNotif = () => {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const token = localStorage.getItem("token");

  const getCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartItems = response.data.result;
      setNumberOfItems(cartItems.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();

    const intervalId = setInterval(() => {
      getCart();
    }, 1000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box>
      <Icon as={FaShoppingCart} boxSize={5} />
      {numberOfItems > 0 && (
        <Box
          position="absolute"
          top="18"
          right="192"
          bg="red.500"
          color="white"
          borderRadius="full"
          w="1rem"
          h="1rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="xs"
        >
          {numberOfItems}
        </Box>
      )}
    </Box>
  );
};
