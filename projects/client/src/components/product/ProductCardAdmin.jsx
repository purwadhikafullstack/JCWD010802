import { Box, Flex, Image, Text } from "@chakra-ui/react"
import formatIDR from "../../helpers/formatIDR"
import { EditProductButton } from "../../views/Admin/components/Products/editButtonProduct"
import { useSelector } from "react-redux"
import { DeleteProductButton } from "../../views/Admin/components/Products/deleteProductButton"


export const ProductCardAdmin = ({ data, category, reload }) => {
    const admin = useSelector((state) => state.user.value)
    return (
        <>
            {data?.map(item => (
                <Flex direction="column" w="180px" bg="white" alignItems="center" p="10px" minW="180px"
                borderRadius="10px" shadow="md" key={item.name}>
                    <Box>
                        <Image src={`${process.env.REACT_APP_BASE_URL}/productImg/${item.productImg}`} w="full" h="200px" objectFit="contain" />
                    </Box>
                    <Box>
                        <Text fontSize="14px">{item.name}</Text>
                        <Text fontSize="16px" fontWeight="bold">{formatIDR(item.price)}</Text>
                    </Box>
                    {admin.roleId === 3 ? 
                    <Flex align="center">
                        <EditProductButton product={item} category={category} reload={reload}/>
                        <DeleteProductButton product={item} reload={reload}/>
                    </Flex> : null}
                </Flex>
            ))}
        </>
    )
}