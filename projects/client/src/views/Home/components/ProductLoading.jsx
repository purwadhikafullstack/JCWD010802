import { Flex, Skeleton } from "@chakra-ui/react"


export const ProductLoading = () => {
    return (
        <Flex gap={3} mt="20px" overflowX="scroll" pb="20px" maxW="1200px">
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px"
            h={{ base: "180px", lg: "300px"}}
            />
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px" 
            />
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px" 
            />
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px" 
            />
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px" 
            />
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px" 
            />
            <Skeleton bg="white"
            alignItems="center"
            p="10px"
            minW={{ base: "140px", lg: "180px"}}
            borderRadius="10px" 
            />
        </Flex>
    )
}