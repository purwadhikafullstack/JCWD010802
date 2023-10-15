import {
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ShippingMethod } from "./ShippingMethod";
import { useSelector } from "react-redux";
import formatIDR from "../../../helpers/formatIDR";
import headersGen from "../../../api/headers";
import axios from "../../../api/axios";

export const CheckoutList = ({ selectedAddress }) => {
  const token = localStorage.getItem("token");
  const headers = headersGen(token)
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipChecked, setShipChecked] = useState(false);
  const [protectChecked, setProtectChecked] = useState(false);
  const cost = parseFloat(useSelector((state) => state.cost.value));

  const Cart = async () => {
    try {
      const response = await axios.get(`/cart`, { headers });
      setCartItems(response.data.result);

      const calculatedSubtotal = response.data.result.reduce((value, item) => {
        return value + item.product.price * item.quantity;
      }, 0);

      setSubtotal(calculatedSubtotal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Cart();
  }, []);

  useEffect(() => {
    updateSubtotal();
  }, [shipChecked, protectChecked]);

  const updateSubtotal = () => {
    let newSubtotal = 0;

    if (cartItems.length > 0) {
      newSubtotal = cartItems.reduce((value, item) => {
        return value + item.product.price * item.quantity;
      }, 0);
    }
    if (shipChecked) {
      newSubtotal += 2000;
    }
    if (protectChecked) {
      newSubtotal += 1500;
    }
    setSubtotal(newSubtotal);
  };
    
  const allWeight = cartItems.reduce((total, item) => {
    return total + item.product.weight;
  }, 0);
  const totalWeight = allWeight * 1000;
  const totalPrice = subtotal + cost
  return (
    <Flex direction={"column"}>
      {cartItems?.map((item) => (
        <>
          <Flex key={item.id}>
            <Image
              src={`${process.env.REACT_APP_BASE_URL}/productImg/${item.product.productImg}`}
              w={"100px"}
              h={"100px"}
              borderRadius={"10px"}
              objectFit="cover"
              mr={5}
            />
           <Stack spacing={1}>
      <Text fontWeight={"bold"} fontSize={"lg"}>
        {item.product.name}
      </Text>
      <Text fontWeight={"light"} noOfLines={{ base: 2, sm: 1 }}>
        {item.quantity} item
      </Text>
      <Text fontWeight={"light"} noOfLines={{ base: 2, sm: 1 }}>
        {item.product.weight} kg
      </Text>
      <Text fontWeight={"semibold"}>
        {formatIDR(item.product.price * item.quantity)}
      </Text>
    </Stack>
          </Flex>
          <Divider borderWidth={2} my={3} marginTop={5} />
        </>
      ))}
      
      <Flex>
        <ShippingMethod
          selectedAddress={selectedAddress}
          totalWeight={totalWeight}
        />
      </Flex>
    </Flex>
  );
}
