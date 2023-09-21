import { Box, Button, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import formatIDR from "../../../helpers/formatIDR";
import { useSelector } from "react-redux";

export const ConfirmCheckout = () => {
  const cart = useSelector((state) => state.cart.value);
  const total = useSelector((state) => state.total.value);
  console.log(cart);
  console.log(total);

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
        </Box>
        <Divider my={5} borderWidth={4} />
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={"2xl"}>Total Price</Heading>
          <Heading fontSize={"2xl"}>{formatIDR(total)}</Heading>
        </HStack>
        <Button colorScheme="green" mt={5} w={"full"}>
          Buy
        </Button>
      </Box>
    </>
  );
};
