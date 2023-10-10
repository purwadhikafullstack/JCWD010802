import React, { useEffect, useState } from "react";
import { Flex, IconButton, Text, Box, Input } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export const Counter = ({ stock, onCountChange }) => {
  const [count, setCount] = useState(1);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    onCountChange(count);
  }, [count, onCountChange]);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
      setInputError(false);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setInputError(false);
    }
  };

  const handleInputChange = (event) => {
    let inputCount =
      event.target.value === "" ? "" : parseInt(event.target.value);

    if (!isNaN(inputCount)) {
      inputCount = Math.min(Math.max(inputCount, 0), stock);
      setCount(inputCount);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <Box>
      <Flex
        align="center"
        border={"1px"}
        borderRadius={"lg"}
        borderColor={"gray.200"}
        w={"120px"}
      >
        <IconButton
          aria-label="Decrement"
          icon={<MinusIcon />}
          onClick={decrement}
          color={count > 0 ? "#517664" : "gray.500"}
          bg={"transparent"}
          size="sm"
          isDisabled={count === 0}
        />
        <Box borderRadius="lg" display="inline-block" mx={1}>
          <Input
            type="text"
            value={count === 0 ? "" : count}
            onChange={handleInputChange}
            min="0"
            max={stock}
            fontSize="lg"
            textAlign="center"
            backgroundColor="transparent"
            border="none"
            pattern="[0-9]*"
            _focus={{ boxShadow: "none" }}
          />
        </Box>
        <IconButton
          aria-label="Increment"
          bg={"transparent"}
          color={"#517664"}
          icon={<AddIcon />}
          onClick={increment}
          size="sm"
          isDisabled={count === stock}
        />
      </Flex>
      {inputError && (
        <Text color="red" fontSize="sm" ml={1}>
          Please enter a valid quantity.
        </Text>
      )}
    </Box>
  );
};
