import React, { useEffect, useState } from 'react';
import { Flex, IconButton, Text, Box } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import axios from 'axios';
export const CartCounter = ({ initialCount, onCountChange,productId }) => {
  const [count, setCount] = useState(initialCount || 0);
  const [stock, setStock] = useState(null)
  const getStock = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/stock/product/${productId}`);
      
        setStock(response.data.result);      
      }
     catch (error) {
      console.log(error);
    }
  };
  console.log(stock);
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onCountChange) {
      onCountChange(newCount);
    }
  };
 
  useEffect(() => {
    getStock()
  }, []);
  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      if (onCountChange) {
        onCountChange(newCount);
      }
    }
  };

  return (
    <Box>
    <Flex align="center" border={"1px"} borderRadius={"lg"} borderColor={"gray.200"} minW={"120px"} justifyContent={"center"}>
      <IconButton
        aria-label="Decrement"
        icon={<MinusIcon />}
        onClick={handleDecrement}
        color={count > 0 ? "#517664" : "gray.500"}
        bg={"transparent"}
        size="sm"
        isDisabled={count === 1}
      />
      <Box borderRadius="lg" display="inline-block" mx={3}>
        <Text fontSize="lg">{count}</Text>
      </Box>
      <IconButton
        aria-label="Increment"
        bg={'transparent'}
        color={"#517664"}
        icon={<AddIcon />}
        onClick={handleIncrement}
        size="sm"
        isDisabled={count === stock}
      />
    </Flex>
    {count === stock && <Text color="red">Maximum items reached</Text>}
  </Box>
  );
};

