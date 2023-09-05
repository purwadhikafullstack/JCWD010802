import { Box, Flex, Image, Text } from "@chakra-ui/react"
import formatIDR from "../../helpers/formatIDR"


export const ProductCard = ({ data }) => {
    return (
        <>
            {data?.map(item => (
                <Flex direction="column" w="200px" bg="white" alignItems="center" p="10px" minW="180px"
                borderRadius="10px" shadow="md" key={item.name}>
                    <Box>
                        <Image src={item.img} w="full" h="200px" objectFit="contain" />
                    </Box>
                    <Box>
                        <Text fontSize="14px">{item.name}</Text>
                        <Text fontSize="16px" fontWeight="bold">{formatIDR(item.price)}</Text>
                    </Box>
                </Flex>
            ))}
        </>
    )
}