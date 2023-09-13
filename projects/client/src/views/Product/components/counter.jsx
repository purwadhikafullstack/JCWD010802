import React, { useEffect, useState } from 'react';
import { Flex, IconButton, Text, Box } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export const Counter = ({stock,onCountChange}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    onCountChange(count);
  }, [count, onCountChange]);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };


  return (
    <Flex align="center"  border={"1px"} borderRadius={"lg"} borderColor={"gray.200"}>
      <IconButton
        aria-label="Decrement"
        icon={<MinusIcon />}
        onClick={decrement}
        color={count>0?"#517664":"gray.500"}
        bg={"transparent"}
        size="sm"
        isDisabled={count === 0} 
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
        onClick={increment}
        size="sm"
        isDisabled={count === stock} 

      />
    </Flex>
  );
};

