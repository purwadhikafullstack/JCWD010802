import { Button, Flex, HStack, Heading, Input, Text } from "@chakra-ui/react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link } from "react-router-dom"


export const Navbar = () => {
    return (
        <Flex minW="full" h="80px" bg="#517664" alignItems="center" 
        justifyContent="space-between" px="50px" py="20px" color="white"
        position="fixed" zIndex={999}>
            <HStack spacing={3} mr={1} display={{ base: "none", lg: "flex"}}>
                <Heading fontSize="2xl" mr="10px">Warehouse</Heading>
                <Button variant="ghost" color="white" as={Link} to="/product"
                _hover={{ color: "#517664", bg: "white"}}>
                    Products
                </Button>
            </HStack>
            <Input maxW="500px" h="40px" bg="white" color="#517664" placeholder="Find your desired items" />
            <HStack  spacing={3} display={{ base: "none", lg: "flex"}}>
                <Button variant="ghost" color="white" as={Link} to="/cart"
                _hover={{ color: "#517664", bg: "white"}}>
                    <AiOutlineShoppingCart />
                </Button>
                <Text>|</Text>
                <Button variant="ghost" color="white" as={Link} to="/login"
                _hover={{ color: "#517664", bg: "white"}}>
                    Sign In
                </Button>
                <Button variant="ghost" color="white" as={Link} to="/register"
                _hover={{ color: "#517664", bg: "white"}}>
                    Register
                </Button>
            </HStack>
        </Flex>
    )
}