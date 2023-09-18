import React, { useEffect, useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export const CartNotif = () => {
  const cart = useSelector(state => state.cart.value); 

  const numberOfItems = cart.length;
console.log(cart);
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
