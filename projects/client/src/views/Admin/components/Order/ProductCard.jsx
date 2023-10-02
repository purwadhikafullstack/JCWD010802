import { Flex, Heading, Image, Text } from "@chakra-ui/react"
import formatIDR from "../../../../helpers/formatIDR"


export const ProductCardOrder = () => {
    return (
        <Flex w="full" mt="10px" bg="white" p="10px 15px" borderRadius="10px" shadow="md"
        justify="space-between" direction={{ base: "column", lg: "row"}}>
            <Flex>
                <Image src="https://cdn.eraspace.com/media/catalog/product/n/o/nokia_c12_charcoal_1.jpg" h="120px" />
                <Flex direction="column" justify="center">
                    <Heading fontSize="16px">Nokia 3310</Heading>
                    <Text fontSize="14px">Quantity: 1</Text>
                    <Text fontSize="14px">{formatIDR(1200000)}</Text>
                </Flex>
            </Flex>
            <Flex direction="column" justify="center" mt={{ base: "10px", lg: "0"}}>
                <Text fontSize="16px">Total</Text>
                <Heading fontSize="16px">{formatIDR(1200000)}</Heading>
            </Flex>
        </Flex>
    )
}