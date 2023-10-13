import { Box, Button, Divider, HStack, Heading, Text, VStack,useBreakpointValue} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { setCartOut } from "../../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import convertToUppercase from "../../../helpers/upperCase";
import formatIDR from "../../../helpers/formatIDR";
import headersGen from "../../../api/headers";
import axios from "../../../api/axios";

export const ConfirmCheckout = ({ addressId }) => {
  const cartId = useSelector((state) => state.cart.id);
  const cart = useSelector((state) => state.cart.value);
  const total = useSelector((state) => state.total.value);
  const cost = parseFloat(useSelector((state) => state.cost.value));
  const ship = useSelector((state) => state.cost.ship);
  const token = localStorage.getItem("token");
  const chekoutPrice = total + cost;
  const dispatch = useDispatch();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const smallTextSize = useBreakpointValue({ base: "14px", lg: "18px" });
  const headers = headersGen(token)
  const navigate = useNavigate()

  const handleBuyClick = async () => {
    try {
      const dataToSend = {
        cartId: cartId,
        addressId: addressId.addressId,
        shippingMethod: ship,
        shippingCost: cost,
      };
      await axios.post('/userOrder', dataToSend,{ headers });
      setTimeout(() => {
        navigate("/profile#myorder"); 
      }, 3000)
 toast.success('Order placed successfully!', {
      position: 'top-right', 
      autoClose: 3000, 
    });
    dispatch(setCartOut())
    } catch (error) {
      console.log("Checkout failed:", error);
      toast.error(`${error.response.data.error} ${error.response.data.items}` ,{position: 'top-center'});
    }
  };

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        w={isMobile ? "100%" : "25%"}
        ml={isMobile ? 0 : 10}
        mt={10}
        h="fit-content"
      >
        <Box>
          <Heading fontSize={isMobile ? "xl" : "2xl"} mb={3}>
            Checkout Summary
          </Heading>
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item) => {
              const subtotal = item.product.price * item.quantity;
              return (
                <HStack
                  justifyContent={isMobile ? "space-between" : "space-between"}
                  key={item.product.id}
                >
                  <Text
                    color="gray.500"
                    fontSize={smallTextSize}
                  >
                    {item.product.name} ({item.quantity}{" "}
                    {item.quantity > 1 ? "items" : "item"})
                  </Text>
                  <Text
                    color="gray.500"
                    fontSize={smallTextSize}
                  >
                    {formatIDR(subtotal)}
                  </Text>
                </HStack>
              );
            })
          ) : (
            <Text>No items in the cart.</Text>
          )}
          <HStack justifyContent={isMobile ? "space-between" : "space-between"}>
            <Text
              color="gray.500"
              fontSize={smallTextSize}
            >
              Shipping Method
            </Text>
            <Text
              color="gray.500"
              fontSize={smallTextSize}
            >
              {convertToUppercase(ship)}
            </Text>
          </HStack>
          <HStack justifyContent={isMobile ? "space-between" : "space-between"}>
            <Text
              color="gray.500"
              fontSize={smallTextSize}
            >
              Shipping Cost
            </Text>
            <Text
              color="gray.500"
              fontSize={smallTextSize}
            >
              {formatIDR(cost)}
            </Text>
          </HStack>
        </Box>
        <Divider my={5} borderWidth={4} />
        <HStack justifyContent="space-between">
          <Heading fontSize={isMobile ? "xl" : "2xl"}>Total Price</Heading>
          <Heading fontSize={isMobile ? "xl" : "2xl"}>
            {formatIDR(chekoutPrice)}
          </Heading>
        </HStack>
        <Button colorScheme="green" mt={5} w={"full"} isDisabled={cost===0} onClick={handleBuyClick}>
          Buy
        </Button>
      </Box>
    </>
  );
};
