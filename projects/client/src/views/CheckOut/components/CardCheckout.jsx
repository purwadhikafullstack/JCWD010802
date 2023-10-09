import { Box, Button, Divider, HStack, Heading, Text, VStack, useDisclosure } from "@chakra-ui/react";
import formatIDR from "../../../helpers/formatIDR";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCartId } from "../../../redux/cartSlice";



export const CartCheckout = ({ cartId }) => {
  const cart = useSelector((state) => state.cart.value);
  const total = useSelector((state) => state.total.value);
  const dispatch = useDispatch();

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      w={{ base: "100%", md: "fit-content" }}
      mt={{ base: 5, md: "50px" }}
      h="fit-content"
    >
      <Box >
        <Heading fontSize={{ base: "xl", md: "2xl" }} >
          Cart Summary
        </Heading>
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item) => {
            const subtotal = item.product.price * item.quantity;
            return (
              <HStack
                justifyContent={{ base: "space-between", md: "space-between" }}
                key={item.product.id}
                mb={{ base: 2, md: 0 }}
              >
                <Text color="gray.500" fontSize={{ base: "md", md: "18px" }}>
                  {item.product.name} ({item.quantity} {item.quantity > 1 ? "items" : "item"})
                </Text>
                <Text color="gray.500" fontSize={{ base: "md", md: "18px" }}>
                  {formatIDR(subtotal)}
                </Text>
              </HStack>
            );
          })
        ) : (
          <Text>No items in the cart.</Text>
        )}
      </Box>
      <Divider my={5} borderWidth={4} />
      <HStack justifyContent={{ base: "space-between", md: "space-berween" }}>
        <Heading fontSize={{ base: "xl", md: "2xl" }}>Total Price</Heading>
        <Heading fontSize={{ base: "xl", md: "2xl" }}>{formatIDR(total)}</Heading>
      </HStack>
      <NavLink to="/checkout">
        <Button
          colorScheme="green"
          mt={5}
          w="full"
          isDisabled={total === 0}
          onClick={() => dispatch(setCartId(cartId))}
        >
          Buy
        </Button>
      </NavLink>
    </Box>

  );
};