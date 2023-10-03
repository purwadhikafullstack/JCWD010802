import { Box, Card, Flex, Heading, Image, Text } from "@chakra-ui/react"


export const ProductCardModal = ({ data }) => {
    return (
        <Card
        key={data.id}
        p={4}
        width={["100%", "100%", "100%", "100%"]} 
        shadow="md"
        borderWidth="1px"
        mx={"auto"}
        position="relative"
        display="flex"
        flexDirection="column"
        >
            <Flex alignItems="center">
                <Image
                    objectFit="cover"
                    src={`http://localhost:8000/productImg/${data.product.productImg}`}
                    alt="#"
                    boxSize="100px" 
                    />
                    <Box ml={4} w="full">
                        <Flex justifyContent="space-between" w="full" align="center">
                            <Heading fontSize="16px">
                                {data.product.name}
                            </Heading>
                        </Flex>
                        <Text color="gray.500" fontSize="14px">
                            Stock: {data.totalQuantity}
                        </Text>
                    </Box>
                </Flex>
            </Card>
    )
}