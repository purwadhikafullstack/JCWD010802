import { Flex, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export const ButtonQuantity = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Flex justifyContent={"start"} alignItems={"center"}>
      <IconButton
        aria-label="Decrement"
        icon={<MinusIcon w={2} />}
        bg={"transparent"}
        size="md"
        onClick={handleDecrement}
        border={"1px solid"}
        _hover={{ bgColor: "red.500" }}
      />
      <Text mx={2} fontSize="md" fontWeight="bold">
        {quantity}
      </Text>
      <IconButton
        aria-label="Increment"
        icon={<AddIcon w={2} />}
        bg={"transparent"}
        size="md"
        onClick={handleIncrement}
        border={"1px solid"}
        _hover={{ bgColor: "green.500" }}
      />
    </Flex>
  );
};
