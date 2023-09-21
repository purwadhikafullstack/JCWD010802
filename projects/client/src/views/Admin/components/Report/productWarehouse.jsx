import {
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationAddress } from "../pagination";

export const ProductWarehouse = () => {
  const [history, setHistory] = useState();
  const [warehouse, setWarehouse] = useState([]);
  const [page, setPage] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const warehouseId = params.get("warehouseId") || "";
  const currentPage = Number(params.get("page")) || 1;

  const getStockHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/report?&warehouseId=${warehouseId}&page=${currentPage}`
      );
      setHistory(response.data.result);
      setPage(response.data.totalpage);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/warehouse/list`
      );
      console.log(response.data);
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleWarehouseChange = (e) => {
    navigate(`?warehouseId=${e.target.value}`);
  };
  useEffect(() => {
    getStockHistory();
    getWarehouse();
  }, [warehouseId, currentPage]);
  return (
    <>
      <Select
        ml={6}
        id="warehouseSelect"
        value={warehouseId}
        onChange={handleWarehouseChange}
        maxWidth="200px"
        variant={"flushed"}
      >
        <option value="">Select a warehouse</option>
        {warehouse?.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </Select>
      <TableContainer>
        <Table variant="striped" colorScheme="green">
          <TableCaption>PRODUCT STOCK HISTORY</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Add/reduce</Th>
              <Th>Action</Th>
              <Th>Total stock</Th>
              <Th>Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history?.map((item) => {
              const createdAtDate = item.createdAt.split("T")[0];
              return (
                <Tr>
                  <Td>{item.stock.product.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.description}</Td>
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
