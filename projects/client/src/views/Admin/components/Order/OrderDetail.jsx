import { Flex, Heading } from "@chakra-ui/react"
import { ProductCardOrder } from "./ProductCard"
import { TableDetail } from "./TableDetail"

export const OrderDetailView = ({ data }) => {
    return (
        <Flex direction="column" gap={5} p="10px 20px">
            <Heading fontSize="24px">Order ID: 1</Heading>
            <Flex w="full" direction="column">
                <Heading fontSize="20px">Purchased Item</Heading>
                <ProductCardOrder />
            </Flex>
            <TableDetail />
        </Flex>
    )
}