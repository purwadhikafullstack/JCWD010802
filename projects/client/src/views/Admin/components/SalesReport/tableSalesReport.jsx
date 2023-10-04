import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import formatIDR from "../../../../helpers/formatIDR";

export const TableSales = ({table}) => {
  
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Sales report</TableCaption>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Category</Th>
            <Th>Total price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {table?.map((item)=> (
            <Tr>
            <Td>{item.name}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.category}</Td>
            <Td>{formatIDR(item.totalPrice)}</Td>
          </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
