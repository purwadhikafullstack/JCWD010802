import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react"


export const CategoryCard = ({ data, onClick, isLoaded }) => {
    return (
        <>
            {data?.map(item => (
                <Skeleton isLoaded={isLoaded}>
                <Flex direction="column" bg="white" alignItems="center" p="10px" minW="161px"
                borderRadius="10px" shadow="md" key={item.name} onClick={() => onClick(item.id)}>
                    <Box>
                        <Image src={`${process.env.REACT_APP_BASE_URL}/categoryImg/${item.categoryImg}`} w="full" h="100px" objectFit="contain" />
                    </Box>
                    <Box mt="10px">
                        <Text fontSize="14px" fontWeight="bold">{item.name}</Text>
                    </Box>
                </Flex>
                </Skeleton>
            ))}
        </>
    )
}