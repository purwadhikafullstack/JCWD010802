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
import axios from "axios";
import { ShippingMethod } from "./ShippingMethod";
import { useSelector } from "react-redux";
import formatIDR from "../../../helpers/formatIDR";

export const CheckoutList = ({ selectedAddress }) => {
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipChecked, setShipChecked] = useState(false);
  const [protectChecked, setProtectChecked] = useState(false);
  const cost = parseFloat(useSelector((state) => state.cost.value));

  const Cart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          <Flex key={item.product.id}>
            <Image
              src={`http://localhost:8000/productImg/${item.product.productImg}`}
              maxW={{ base: "50px", sm: "100px" }}
              objectFit="cover"
              mr={5}
            />
            <Stack>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {item.product.name}
              </Text>
              <Text fontWeight={"light"}>{item.quantity} item</Text>
              <Text fontWeight={"light"}>{item.product.weight} kg</Text>
              <Text fontWeight={"semibold"}>
                Rp. {item.product.price * item.quantity}
              </Text>
            </Stack>
          </Flex>
          <Divider borderWidth={2} my={3} marginTop={5} />
        </>
      ))}
      <CheckboxGroup colorScheme="green">
        <Stack
          spacing={[1, 5]}
          direction={["column", "row"]}
          justifyContent={"flex-start"}
        >
          <Checkbox value="2000" onChange={() => setShipChecked(!shipChecked)}>
            Shipping insurance
          </Checkbox>
          <Checkbox
            value="1500"
            onChange={() => setProtectChecked(!protectChecked)}
          >
            Protection discount
          </Checkbox>
        </Stack>
      </CheckboxGroup>
      <Divider borderWidth={2} my={3} marginTop={5} />
      <Flex>
        <ShippingMethod
          selectedAddress={selectedAddress}
          totalWeight={totalWeight}
        />
      </Flex>
      <Divider borderWidth={2} my={3} marginTop={5} />
      <Flex justifyContent={"space-between"}>
        <Text fontWeight={"bold"} fontSize={{ base: "15px", lg: "25px" }}>
          Subtotal :
        </Text>
        <Text fontWeight={"bold"} fontSize={{ base: "15px", lg: "25px" }}>
        {formatIDR(totalPrice)}
        </Text>
      </Flex>
    </Flex>
  );
};
