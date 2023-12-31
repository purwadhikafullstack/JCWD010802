import React, { useEffect, useState } from 'react';
import { Flex, IconButton, Text, Box, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useDispatch } from "react-redux";
import { setCart } from '../../../redux/cartSlice';
import { setPrice } from '../../../redux/totalPrice';
import headersGen from '../../../api/headers';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';

export const CartCounter = ({ initialCount, onCountChange, productId, cartId }) => {
  const [count, setCount] = useState(initialCount || 0);
  const [stock, setStock] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const headers = headersGen(token)

  const getStock = async () => {
    try {
      const response = await axios.get(`/stock/product/${productId}`);

      setStock(response.data.result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product stock!")
    }
  };

  useEffect(() => {
    getStock();
  }, []);

  const handleIncrement = () => {
    const newCount = count + 1;
    updateCartQuantity(newCount);
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      updateCartQuantity(newCount);
    }
  };

  const updateCartQuantity = async (newCount) => {
    try {
      const response = await axios.patch(`/cart/${cartId}`, {
        quantity: newCount,
      });

      if (response.status === 200) {
        setCount(newCount);
        if (onCountChange) {
          onCountChange(newCount);
        }
      }
      const cartResponse = await axios.get(`/cart`, { headers });
      setReload(!reload);
      dispatch(setCart(cartResponse.data.result));
      dispatch(setPrice(cartResponse.data.totalPrice));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    let inputCount = event.target.value === '' ? '' : parseInt(event.target.value);

    if (!isNaN(inputCount)) {
      inputCount = Math.min(Math.max(inputCount, 0), stock);
      setCount(inputCount);
      updateCartQuantity(inputCount);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };
  
  return (
    <Box>
      <Flex align="center" border="1px" borderRadius="lg" borderColor="gray.200" minW="120px" justifyContent="center">
        <IconButton
          aria-label="Decrement"
          icon={<MinusIcon />}
          onClick={handleDecrement}
          color={count > 0 ? "#517664" : "gray.500"}
          bg="transparent"
          size="sm"
          isDisabled={count === 1}
        />
        <Box borderRadius="lg" display="inline-block" mx={3}>
          <Input
            type="text"
            value={count === "" ? 1 : count}
            onChange={handleInputChange}
            min="0"
            max={stock}
            fontSize="lg"
            textAlign="center"
            backgroundColor="transparent"
            border="none"
            pattern="[0-9]*"
            w={{ base: "50px", md: "75px" }}
            _focus={{ boxShadow: "none" }}
          />
        </Box>
        <IconButton
          aria-label="Increment"
          bg="transparent"
          color="#517664"
          icon={<AddIcon />}
          onClick={handleIncrement}
          size="sm"
          isDisabled={count === stock}
        />
      </Flex>
      {inputError && (
        <Text color="red" fontSize="sm" mt={1}>
          Please enter a valid quantity.
        </Text>
      )}
    </Box>
  );
};
