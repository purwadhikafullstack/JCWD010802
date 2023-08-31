import { Box, Flex, Image, Text } from "@chakra-ui/react"


export const CategoryCard = ({ data }) => {
    return (
        <>
            {data?.map(item => (
                <Flex direction="column" bg="white" alignItems="center" p="10px" minW="180px"
                borderRadius="10px" shadow="md" key={item.name}>
                    <Box>
                        <Image src={item.img} w="full" h="100px" objectFit="contain" />
                    </Box>
                    <Box mt="10px">
                        <Text fontSize="14px" fontWeight="bold">{item.name}</Text>
                    </Box>
                </Flex>
            ))}
        </>
    )
}