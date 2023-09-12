import React, { useState } from "react";
import { Box, Center, Flex, Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const MinMaxSort = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const price = params.get("price") || "";
  const sort = params.get("sort") || "";
  const category = params.get("category") || "";
  const navigate = useNavigate();

  const [newMinPrice, setNewMinPrice] = useState(minPrice);
  const [newMaxPrice, setNewMaxPrice] = useState(maxPrice);

  const handleSortMin = () => {
    if (newMinPrice !== minPrice) {
        navigate(`?search=${search}&sort=${sort}&category=${category}&price=${price}&minPrice=${newMinPrice}&maxPrice=${newMaxPrice}`);
    }
  };
  const handleSortMax = () => {
    if (newMaxPrice !== maxPrice) {
        navigate(`?search=${search}&sort=${sort}&category=${category}&price=${price}&minPrice=${newMinPrice}&maxPrice=${newMaxPrice}`);
      }
  };

  return (
    <Stack spacing={4}>
      <InputGroup>
        <Box>
          <Flex>
          <InputLeftAddon children="Rp." />
          <Input
            type="number"
            placeholder="Minimum price"
            value={newMinPrice}
            onBlur={handleSortMin}
            onChange={(e) => setNewMinPrice(e.target.value)}
            />
            </Flex>
            <Center>
            </Center>
          <Flex>
          <InputLeftAddon children="Rp." />
          <Input
            type="number"
            placeholder="Maximum price"
            value={newMaxPrice}
            onBlur={handleSortMax}
            onChange={(e) => setNewMaxPrice(e.target.value)}
            />
            </Flex>
        </Box>
      </InputGroup>
    </Stack>
  );
};
