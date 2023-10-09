import React, { useEffect, useState } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export const CartNotif = () => {
  const cart = useSelector(state => state.cart.value); 

  let numberOfItems
  if (cart) {
    numberOfItems = cart.length;
  }
console.log(cart);
  return (
    <Flex direction="column" align="center">
      <Icon as={FaShoppingCart} boxSize={5} />
      {numberOfItems > 0 && (
        <Box
          position="absolute"
          top="22px"
          right="178"
          bg="red.500"
          color="white"
          borderRadius="full"
          w="0.9rem"
          h="0.9rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="10px"
        >
          {numberOfItems}
        </Box>
      )}
    </Flex>
  );
};
