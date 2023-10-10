import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationAddress } from "../pagination";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

export const StockHistory = () => {
  const [history, setHistory] = useState();
  const [warehouse, setWarehouse] = useState([]);
  const [page, setPage] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const warehouseId = params.get("warehouseId") || "";
  const monthly = params.get("monthly") || "";
  const currentPage = Number(params.get("page")) || 1;
  const user = useSelector((state) => state.user.value);
  const getStockHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/report?search=${search}&warehouseId=${warehouseId}&monthly=${monthly}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHistory(response.data.result);
      setPage(response.data.totalpage);
    } catch (error) {
      console.log(error);
    }
  };
  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/warehouse/list`
      );
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    navigate(
      `?search=${e.target.value}&warehouseId=${warehouseId}&monthly=${monthly}&page=${currentPage}`
    );
  };
  const handleWarehouseChange = (e) => {
    navigate(
      `?warehouseId=${e.target.value}&monthly=${monthly}&page=${currentPage}`
    );
  };
  const handleMonthly = (e) => {
    navigate(
      `?warehouseId=${warehouseId}&monthly=${e.target.value}&page=${currentPage}`
    );
  };
  useEffect(() => {
    getStockHistory();
    getWarehouse();
  }, [search, warehouseId, currentPage, monthly]);
  return (
    <>
      <Flex
        gap={5}
        maxW={"100vw"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex maxW={"50vw"} gap={5} mt={6}>
          {user.roleId === 3 ? (
            <Select
              id="warehouseSelect"
              value={warehouseId}
              onChange={handleWarehouseChange}
              maxWidth="200px"
              borderColor={"2px solid black"}
            >
              <option value="">Select a warehouse</option>
              {warehouse?.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </Select>
          ) : null}
          <InputGroup>
            <Input
              variant="outline"
              placeholder="Search"
              _placeholder={{ color: "black" }}
              defaultValue={search}
              type={"search"}
              color={"black"}
              onChange={handleSearch}
              borderColor={"2px solid black"}
            />
            <InputLeftElement>
              <Icon as={BsSearch} color={"gray.500"} />
            </InputLeftElement>
          </InputGroup>
        </Flex>
        <Flex maxW={"30vw"}>
          <Box>
            <Text as={"sup"} fontWeight={"bold"}>
              Filter by month :
            </Text>
            <Input
              type="month"
              onChange={handleMonthly}
              borderColor={"2px solid black"}
            ></Input>
          </Box>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="green">
          <TableCaption>PRODUCT STOCK HISTORY</TableCaption>
          <Thead>
            <Tr>
              {user.roleId === 3 ? (<Th>Warehouse</Th>) : null}
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
              return (
                <Tr>
                  {user.roleId === 3 ? (
                    <Td>{item.stock?.warehouse?.name}</Td>
                  ) : null}
                  <Td>{item.stock?.product?.name}</Td>
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
