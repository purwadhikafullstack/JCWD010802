import { Box, Button, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import formatIDR from "../../../helpers/formatIDR";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { TbReload } from "react-icons/tb";

export const ConfirmCheckout = ({addressId}) => {
  const cartId = useSelector((state) => state.cart.id);
  const cart = useSelector((state) => state.cart.value);
  const total = useSelector((state) => state.total.value);
  const cost = parseFloat(useSelector((state) => state.cost.value));
  const ship = useSelector((state) => state.cost.ship)
  const token = localStorage.getItem("token")
  const chekoutPrice = total+cost
  const location = useLocation();
console.log(cartId);
  const handleBuyClick = async () => {
    try {
      const dataToSend = {
        cartId: cartId, 
        addressId: addressId.addressId,
        shippingMethod: ship, 
        shippingCost: cost,
      };

      const response = await axios.post('http://localhost:8000/api/userOrder', dataToSend,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        window.location.href = '/'; 
      }, 3000)
 toast.success('Order placed successfully!', {
      position: 'top-right', 
      autoClose: 3000, 
    });
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow={"md"}
        w={"25%"}
        ml={10}
        mt={10}
        h={"fit-content"}
      >
        <Box>
          <Heading fontSize={"2xl"} mb={3}>
            Checkout Summary
          </Heading>
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item) => {
              const subtotal = item.product.price * item.quantity;
              return (
                <HStack justifyContent={"space-between"} key={item.product.id}>
                  <Text color={"gray.500"} fontSize={"18px"}>
                    {item.product.name} ({item.quantity}{" "}
                    {item.quantity > 1 ? "items" : "item"})
                  </Text>
                  <Text color={"gray.500"} fontSize={"18px"}>
                    {formatIDR(subtotal)}
                  </Text>
                </HStack>
              );
            })
          ) : (
            <Text>No items in the cart.</Text>
          )}
                  <HStack  justifyContent={"space-between"} >
                    <Text   color={"gray.500"} fontSize={"18px"}>
                    Shipping Cost
                    </Text>
                    <Text   color={"gray.500"} fontSize={"18px"}>
                    {formatIDR(cost)}
                    </Text>
                  </HStack>
        </Box>
        <Divider my={5} borderWidth={4} />
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={"2xl"}>Total Price</Heading>
          <Heading fontSize={"2xl"}>{formatIDR(chekoutPrice)}</Heading>
        </HStack>
        <Button colorScheme="green" mt={5} w={"full"} isDisabled={cost===0} onClick={handleBuyClick}
>
          Buy
        </Button>
      </Box>
    </>
  );
};
