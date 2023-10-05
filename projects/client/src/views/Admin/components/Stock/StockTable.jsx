import { Flex, IconButton, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { BsImageFill } from "react-icons/bs"
import { UpdateStcokButton } from "./UpdateStockButton"

export const StockTable = ({ data, handleCat, handleWarehouse, handleSearch, warehouse, category, reload, user }) => {
    return (
        <Flex w="full" direction="column" justifyContent="center" gap={5} mt="20px">
            <Flex gap={2}>
                <Input borderColor="black" onChange={(e) => handleSearch(e.target.value)} placeholder="Search Product" w="fit-content" />
                <Select placeholder="All Categories" w="fit-content"
                onChange={(e) => handleCat(e.target.value)} borderColor="black"
                >
                    {category?.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </Select>
                {user.roleId === 3 ? 
                <Select placeholder="All Warehouses" w="fit-content"
                onChange={(e) => handleWarehouse(e.target.value)} borderColor="black"
                >
                    <option value="">All Warehouses</option>
                    {warehouse?.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </Select> : null}
            </Flex>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Product</Th>
                            <Th>Total Stock</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((item, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Text maxW="200px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">{item.product.name}</Text>
                                </Td>
                                <Td>{item.totalQuantity}</Td>
                                <Td>
                                    <Flex>
                                        <UpdateStcokButton data={item} reload={reload} />
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