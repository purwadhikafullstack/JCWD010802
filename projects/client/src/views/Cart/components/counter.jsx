import React, { useState } from 'react';
import { Flex, IconButton, Text, Box } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
export const CartCounter = ({ initialCount, onCountChange }) => {
  const [count, setCount] = useState(initialCount || 0);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onCountChange) {
      onCountChange(newCount);
    }
  };

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
    <Flex align="center"  border={"1px"} borderRadius={"lg"} borderColor={"gray.200"} minW={"120px"} justifyContent={"center"}>
      <IconButton
        aria-label="Decrement"
        icon={<MinusIcon />}
        onClick={handleDecrement}
        color={count>0?"#517664":"gray.500"}
        bg={"transparent"}
        size="sm"
      />
      <Box
        borderRadius="lg"
        display="inline-block"
        mx={3}
      >
        <Text fontSize="lg">
          {count}
        </Text>
      </Box>
      <IconButton
        aria-label="Increment"
        bg={'transparent'}
        color={"#517664"}
        icon={<AddIcon />}
        onClick={handleIncrement}
        size="sm"

      />
    </Flex>
  );
};

