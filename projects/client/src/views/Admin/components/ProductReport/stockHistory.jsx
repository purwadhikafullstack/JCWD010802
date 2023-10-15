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
import { PaginationAddress } from "../pagination";
import { useSelector } from "react-redux";
import { Filtering } from "./components/filteringProductStock";


export const StockHistory = ({
  history,
  page,
  search,
  warehouse,
  warehouseId,
  monthly,
  handleSearch,
  handleWarehouseChange,
  handleMonthly,
  handleReset,
}) => {
  const user = useSelector((state) => state.user.value);
  return (
    <>
      <Filtering
        search={search}
        warehouse={warehouse}
        warehouseId={warehouseId}
        monthly={monthly}
        handleSearch={handleSearch}
        handleWarehouseChange={handleWarehouseChange}
        handleMonthly={handleMonthly}
        handleReset={handleReset}
      />
      <TableContainer>
        <Table variant="striped" colorScheme="green">
          <TableCaption>PRODUCT STOCK HISTORY</TableCaption>
          <Thead>
            <Tr>
              {user.roleId === 3 ? <Th>Warehouse</Th> : null}
              <Th>Name</Th>
              <Th>Add/reduce</Th>
              <Th>Action</Th>
              <Th>Total stock</Th>
              <Th>Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history?.map((item) => {
              const createdAtDate = item.updatedAt.split("T")[0];
              const actionNote = item.requestHistoryId ? "Manual request" : item.orderId ? "Sales" : "Stock update";
              return (
                <Tr>
                  {user.roleId === 3 ? (
                    <Td>{item.stock?.warehouse?.name}</Td>
                  ) : null}
                  <Td>{item.stock?.product?.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{actionNote}</Td>
                  <Td>{item.stock.quantity}</Td>

                  <Td>{createdAtDate}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <PaginationAddress totalpage={page} />
    </>
  );
};