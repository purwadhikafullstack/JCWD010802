import { Flex, Heading, Image, Text } from "@chakra-ui/react"
import formatIDR from "../../../../helpers/formatIDR"


export const ProductCardOrder = ({ data }) => {
    const product = data?.orderItems
    console.log(product);
    return (
        <>
        {product?.map((item) => (
            <Flex w="full" mt="10px" bg="white" p="10px 15px" borderRadius="10px" shadow="md"
            justify="space-between" direction={{ base: "column", lg: "row"}} key={item.id}>
                <Flex>
                    <Image src={`http://localhost:8000/productImg/${item.product.productImg}`} h="120px" />
                    <Flex direction="column" justify="center">
                        <Heading fontSize="16px">{item.product.name}</Heading>
                        <Text fontSize="14px">Quantity: {item.quantity}</Text>
                        <Text fontSize="14px">{formatIDR(item.product.price)}</Text>
                    </Flex>
                </Flex>
                <Flex direction="column" justify="center" mt={{ base: "10px", lg: "0"}}>
                    <Text fontSize="16px">Total</Text>
                    <Heading fontSize="16px">{formatIDR(item.quantity * item.product.price)}</Heading>
                </Flex>
            </Flex>
        ))}
        </>
    )
}