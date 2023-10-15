import { Flex, Skeleton } from "@chakra-ui/react"


export const CategoryLoading = () => {
    return (
        <Flex gap={3} mt="20px" pb="20px" overflowX="scroll" maxW="1200px">
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
            <Skeleton minW="161px" borderRadius="10px" h="150px" />
        </Flex>
    )
}