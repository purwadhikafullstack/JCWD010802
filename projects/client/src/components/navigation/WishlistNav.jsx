import { Flex, Icon } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai";

export const WishlistNav = () => {
    return (
        <Flex direction="column" align="center">
            <Icon as={AiFillHeart} boxSize={5} />
        </Flex>
    )
}