import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sorting } from "./SortBy/Sorting";
import { CategorySort } from "./SortBy/CategorySort";
import { MinMaxSort } from "./SortBy/MinMaxPriceSort";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { GrPowerReset } from "react-icons/gr";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [reset, setReset] = useState(0);
  const [newMinPrice, setNewMinPrice] = useState("");
  const [newMaxPrice, setNewMaxPrice] = useState("");

  const handleReset = () => {
    navigate(`?`);
    setReset(1);
    setNewMinPrice("");
    setNewMaxPrice("");
  };

  return (
    <Flex>
      <Stack
        spacing={3}
        pt={"100px"}
        px={"10px"}
        display={{ base: "none", md: "block" }}
      >
        <Text fontWeight={"bold"}>Product :</Text>
        <Sorting />
        <Text fontWeight={"bold"}>Category :</Text>
        <CategorySort />
        <Text fontWeight={"bold"}>Range price :</Text>
        <MinMaxSort reset={reset} />
        <Button
          mt={5}
          w={"full"}
          rightIcon={<GrPowerReset />}
          colorScheme="red"
          variant="ghost"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>
      <Box width={"full"}>
        <Outlet />
      </Box>
    </Flex>
  );
};
