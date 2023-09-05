import { Flex, Text } from "@chakra-ui/react"
import { AiOutlineAppstore, AiOutlineShoppingCart } from "react-icons/ai"
import { BiHomeAlt, BiUserCircle } from "react-icons/bi"


export const MobileNav = () => {
    return (
        <Flex justifyContent="space-evenly" align="center" display={{ base: "flex", lg: "none"}}
        position="fixed" bottom="0" w="full" h="30px" bg="#cacfd6" py="30px">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <BiHomeAlt />
                <Text>Home</Text>
            </Flex>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <AiOutlineAppstore />
                <Text>Product</Text>
            </Flex>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <AiOutlineShoppingCart />
                <Text>Cart</Text>
            </Flex>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <BiUserCircle />
                <Text>Account</Text>
            </Flex>
        </Flex>
    )
}