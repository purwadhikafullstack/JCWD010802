import { Box, Button, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import formatIDR from "../../../helpers/formatIDR"

export const CartCheckout = ({cart,total}) =>{
    let totalPrice = 0
    console.log(cart);
    return(
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
                    Cart Summary
                </Heading>
                {cart.map((item)=>{
                     const subtotal = item.product.price * item.quantity;
                     totalPrice += subtotal;
                     return (
                    <HStack justifyContent={"space-between"}>
                       <Text color={"gray.500"} fontSize={"18px"}>
                {item.product.name} ({item.quantity}{" "}
                {item.quantity > 1 ? "items" : "item"})
              </Text>
                        <Text color={"gray.500"} fontSize={"18px"}>{formatIDR (subtotal)}
                        </Text>

                    </HStack>
                     )
                })}
            </Box>
            <Divider my={5} borderWidth={4}/>
            <HStack justifyContent={"space-between"}>
            <Heading fontSize={"2xl"}>
                    Total Price
            </Heading>
            <Heading fontSize={"2xl"}>
                {formatIDR(total)}
            </Heading>
            </HStack>
            <Button colorScheme="green" mt={5} w={"full"}>
                Buy
            </Button>
        </Box>
        </>
    )
}