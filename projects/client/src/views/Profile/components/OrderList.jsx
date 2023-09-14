import { Badge, Divider, Flex, Image, Text } from "@chakra-ui/react"
import formatIDR from "../../../helpers/formatIDR"


export const OrderList = () => {
    return (
        <Flex w="full" direction="column" gap={5}>
            <Flex w="full" direction="column" bg="white" p="20px 30px" borderRadius="10px" shadow="md">
                <Flex align="center" gap={3} fontSize="14px">
                    <Text fontWeight="bold">Belanja</Text>
                    <Text>13 September 2013</Text>
                    <Badge colorScheme="green">Success</Badge>
                    <Text color="gray.500" display={{ base: "none", md: "block"}}>INV/20230528/MPL/3258437023</Text>
                </Flex>
                <Flex align={{base: "flex-start", md: "center"}} justifyContent="space-between" direction={{ base: "column", md: "row"}}>
                    <Flex justifyContent="center" direction={{ base: "column", md: "row"}}>
                        <Image src="https://cdn.eraspace.com/media/catalog/product/m/x/mxqt2ll.jpg" maxW="120px"/>
                        <Flex direction="column" justify="center">
                            <Text fontWeight="bold">Apple Magic Keyboard for 11inci iPad Pro (Gen ke 2)</Text>
                            <Text fontSize="14px" color="gray.500">1 Barang x {formatIDR(5000000)}</Text>
                        </Flex>
                    </Flex>
                    <Flex direction="column">
                        <Text color="gray.500" fontSize="14px">Total Belanja</Text>
                        <Text>{formatIDR(5000000)}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w="full" direction="column" bg="white" p="20px 30px" borderRadius="10px" shadow="md">
                <Flex align="center" gap={3} fontSize="14px">
                    <Text fontWeight="bold">Belanja</Text>
                    <Text display={{ base: "none", md: "block"}}>13 September 2013</Text>
                    <Badge colorScheme="green">Success</Badge>
                    <Text color="gray.500" display={{ base: "none", md: "block"}}>INV/20230528/MPL/3258437023</Text>
                </Flex>
                <Flex align={{base: "flex-start", md: "center"}} justifyContent="space-between" direction={{ base: "column", md: "row"}}>
                    <Flex justifyContent="center" direction={{ base: "column", md: "row"}}>
                        <Image src="https://cdn.eraspace.com/media/catalog/product/g/a/garmin_descent_mk2s_dive_champagne_1.jpg" maxW="120px"/>
                        <Flex direction="column" justify="center">
                            <Text fontWeight="bold">Garmin Descent Mk2S Dive - Champagne</Text>
                            <Text fontSize="14px" color="gray.500">1 Barang x {formatIDR(16000000)}</Text>
                        </Flex>
                    </Flex>
                    <Flex direction="column">
                        <Text color="gray.500" fontSize="14px">Total Belanja</Text>
                        <Text>{formatIDR(16000000)}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}