import { Outlet } from "react-router-dom";
import { Sorting } from "./SortBy/Sorting";
import { CategorySort } from "./SortBy/CategorySort";
import { MinMaxSort } from "./SortBy/MinMaxPriceSort";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export const Sidebar = () => {
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
        <MinMaxSort />
      </Stack>
      <Box width={"full"}>
        <Outlet />
      </Box>
    </Flex>
  );
};
