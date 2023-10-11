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

export const ProductWarehouse = ({
  history,
  page,
  search,
  warehouse,
  warehouseId,
  monthly,
  handleSearch,
  handleWarehouseChange,
  handleMonthly,
  handleReset
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
          <TableCaption>STOCK REPORT ALL PRODUCT</TableCaption>
          <Thead>
            <Tr>
              {user.roleId === 3 ? <Th>Warehouse</Th> : null}
              <Th>Product</Th>
              <Th>Total add</Th>
              <Th>Total reduce</Th>
              <Th>Total stock</Th>
              <Th>Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history?.map((item) => {
              const createdAtDate = item.totals.latestUpdatedAt.split("T")[0];
              return (
                <Tr>
                  {user.roleId === 3 ? (
                    <Td>{item.entries[0].stock.warehouse.name}</Td>
                  ) : null}
                  <Td>{item.productName}</Td>
                  <Td>{item.totals.tambah}</Td>
                  <Td>{item.totals.kurang}</Td>
                  <Td>{item.totals.quantity}</Td>
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
