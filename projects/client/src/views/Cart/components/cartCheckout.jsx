import { Box, Button, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import formatIDR from "../../../helpers/formatIDR"

export const CartCheckout = (cart) =>{
    return(
        <>
          <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow={"md"}
          w={"20%"}
          h={"fit-content"}
        >
            <Box>
                <Heading fontSize={"2xl"}>
                    Cart Summary
                </Heading>
                <Text color={"gray.400"}> Total Item ({cart.length})</Text>
            </Box>
            <Divider my={5}/>
            <HStack justifyContent={"space-between"}>
            <Heading fontSize={"2xl"}>
                    Total Price
            </Heading>
            <Heading fontSize={"2xl"}>
                {formatIDR(cart.price)}
            </Heading>
            </HStack>
            <Button colorScheme="green" mt={5} w={"full"}>
                Buy
            </Button>
        </Box>
        </>
    )
}