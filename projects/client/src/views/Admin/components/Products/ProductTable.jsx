import { Avatar, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import formatIDR from "../../../../helpers/formatIDR"
import { EditProductButton } from "./editButtonProduct"
import { DeleteProductButton } from "./deleteProductButton"
import { useSelector } from "react-redux"

export const ProductTable = ({ reload, product, category }) => {
    const user = useSelector((state) => state.user.value)
    return (
        <Flex w="full" direction="column" justifyContent="center" gap={5} mt="20px">
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Product</Th>
                            <Th>Price</Th>
                            <Th>Category</Th>
                            <Th>Weight</Th>
                            <Th display={user.roleId === 3 ? "block" : "none"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {product?.map((item) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Flex align="center" gap={2}>
                                        <Avatar size="md" src={`http://localhost:8000/productImg/${item.productImg}`} />
                                        <Text  maxW="200px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">{item.name}</Text>
                                    </Flex>
                                </Td>
                                <Td>{formatIDR(item.price)}</Td>
                                <Td>{item.category.name}</Td>
                                <Td>{item.weight} kg</Td>
                                <Td display={user.roleId === 3 ? "block" : "none"}>
                                    <Flex align="center" gap={1}>
                                        <EditProductButton product={item} category={category} reload={reload} />
                                        <DeleteProductButton product={item} reload={reload} />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}