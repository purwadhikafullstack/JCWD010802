import React from 'react';
import { Box, Text, Image, Button, Flex, HStack } from '@chakra-ui/react';
import { Counter } from '../../Product/components/counter';
import { CartCounter } from './counter';
import { DeleteCart } from './deleteCart';
import formatIDR from '../../../helpers/formatIDR';

export const CartItem = ({ cart }) => {
  return (
    <Flex direction="column" w={"60%"}>
      {cart.map((item) => (
        <Box
          key={item.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          mb={4}
          display="flex"
          flexDirection="row"
        >
          <Image src={`http://localhost:8000/productImg/${item.product.productImg}`} alt={item.product.name} maxH="100px" maxW="100px" />
          <Box ml={4} flex="1">
            <Text fontSize="xl" fontWeight="bold">
              {item.product.name}
            </Text>
            <Text mt={2}>Price: {formatIDR( item.product.price)}</Text>
            <HStack justifyContent={"flex-end"} gap={8}>
        <DeleteCart/>
        <CartCounter initialCount={item.quantity}/>
                  </HStack>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};
