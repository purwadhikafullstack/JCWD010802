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
import dateFormater from "../../../../helpers/dateFormater";
import { useSelector } from "react-redux";

export const TableSales = ({ table }) => {
  const user = useSelector((state) => state.user.value);
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Sales report</TableCaption>
        <Thead>
          <Tr>
            {user.roleId === 3 ? <Th>Warehouse</Th> : null}
            <Th>Category</Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Total price</Th>
            <Th>Last update</Th>
          </Tr>
        </Thead>
        <Tbody>
          {table?.map((item) => (
            <Tr>
              {user.roleId === 3 ? <Td>{item.warehouseName}</Td> : null}
              <Td>{item.category}</Td>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>{formatIDR(item.totalPrice)}</Td>
              <Td>{dateFormater(item.updatedAt)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
