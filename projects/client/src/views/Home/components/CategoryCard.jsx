import { Box, Flex, Image, Text } from "@chakra-ui/react"


export const CategoryCard = ({ data, onClick }) => {
    return (
        <>
            {data?.map(item => (
                <Flex direction="column" bg="white" alignItems="center" p="10px" minW="158px"
                borderRadius="10px" shadow="md" key={item.name} onClick={() => onClick(item.id)}>
                    <Box>
                        <Image src={`http://localhost:8000/categoryImg/${item.categoryImg}`} w="full" h="100px" objectFit="contain" />
                    </Box>
                    <Box mt="10px">
                        <Text fontSize="14px" fontWeight="bold">{item.name}</Text>
                    </Box>
                </Flex>
            ))}
        </>
    )
}