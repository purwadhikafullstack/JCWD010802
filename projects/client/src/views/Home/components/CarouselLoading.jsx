import { Flex, Skeleton } from "@chakra-ui/react"


export const CarouselLoading = ({ isLoaded }) => {
    return (
        <Flex 
        justify="center" 
        w="full"
        bg="#edf3f8"
        alignItems="center"
        justifyContent="center"
        px={{ base: "20px", lg: "50px" }}
        py="20px"
        pos="relative">
            <Skeleton w="full"
            maxW="1200px"
            borderRadius="10px"
            shadow="md"
            h={{ base: "200px", lg: "400px" }}
            fontSize="0"
            overflow="hidden"
            pos="relative"
            />
        </Flex>
    )
}