import { Box, Card, Flex, Heading, Image, Text } from "@chakra-ui/react"
import formatIDR from "../../../../../helpers/formatIDR"


export const DetailProductOrder = ({ data }) => {
    return (
        <>
        {data.orderItems.map((item) => (
            <Card
            key={item.id}
            p={4}
            width={["100%", "100%", "100%", "100%"]} 
            shadow="md"
            borderWidth="1px"
            mx={"auto"}
            position="relative"
            display="flex"
            flexDirection="column"
            mt="10px"
            >
                <Flex alignItems="center">
                    <Image
                        objectFit="cover"
                        src={`${process.env.REACT_APP_BASE_URL}/productImg/${item.product.productImg}`}
                        alt="#"
                        boxSize="100px" 
                        />
                        <Box ml={4} w="full">
                            <Flex direction="column" w="full" gap={2}>
                                <Heading fontSize="16px">
                                    {item.product.name}
                                </Heading>
                                <Text color="gray.500" fontSize="14px">
                                    {`${item.quantity} x ${formatIDR(item.product.price)}`}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Card>
        ))}
        </>
    )
}