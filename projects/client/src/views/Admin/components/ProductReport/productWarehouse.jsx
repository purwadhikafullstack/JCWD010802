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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationAddress } from "../pagination";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import headersGen from "../../../../api/headers";
import axios from "../../../../api/axios";

export const ProductWarehouse = () => {
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
  const token = localStorage.getItem("token")
  const headers = headersGen(token)

  const getProductWarehouse = async () => {
    try {
      const response = await axios.get(`/report/product?search=${search}&warehouseId=${warehouseId}&monthly=${monthly}&page=${currentPage}`,
        { headers }
      );
      setHistory(response.data.groupedResults);
      setPage(response.data.totalpage);
    } catch (error) {
      console.log(error);
    }
  };
  const getWarehouse = async () => {
    try {
      const response = await axios.get(`/warehouse/list`);
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
    getProductWarehouse();
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
          <TableCaption>STOCK REPORT ALL PRODUCT</TableCaption>
          <Thead>
            <Tr>
              {user.roleId === 3 ? (<Th>Warehouse</Th>) : null}
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
