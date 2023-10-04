import { Flex, Input, Select } from "@chakra-ui/react";
import { ChartReport } from "../components/SalesReport/chartReport";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { TableSales } from "../components/SalesReport/tableSalesReport";

export const SalesReportView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [salesCat, setSalesCat] = useState();
  const [category, setCategory] = useState();
  const [table, setTable] = useState();
  const [warehouse, setWarehouse] = useState([]);
  const warehouseId = params.get("warehouseId") || "";
  const categoryId = params.get("categoryId") || "";
  const date = params.get("date") || "";
  const user = useSelector((state) => state.user.value);

  const getCategoryReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sales/chart?warehouseId=${warehouseId}&categoryId=${categoryId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSalesCat(response.data.monthlyTotal);
    } catch (error) {
      console.log(error);
    }
  };
  const getTableSales = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sales/table-sales?warehouseId=${warehouseId}&categoryId=${categoryId}&date=${date}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTable(response.data.result);
    } catch (err) {
      console.log(err);
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
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category?limit=9999`
      );
      setCategory(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleWarehouseChange = (e) => {
    navigate(
      `?warehouseId=${e.target.value}&categoryId=${categoryId}&date=${date}`
    );
  };
  const handleCategory = (e) => {
    navigate(
      `?warehouseId=${warehouseId}&categoryId=${e.target.value}&date=${date}`
    );
  };
  const handleDate = (e) => {
    navigate(
      `?warehouseId=${warehouseId}&categoryId=${categoryId}&date=${e.target.value}`
    );
  };
  useEffect(() => {
    getCategoryReport();
    getWarehouse();
    getTableSales();
    getCategory();
  }, [warehouseId, categoryId, date]);
  return (
    <Flex gap={5} w={"full"} direction={"column"}>
      <Flex w={"full"} gap={3} mt={6}>
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
        <Select
          id="categorySelect"
          value={categoryId}
          onChange={handleCategory}
          maxWidth="200px"
          borderColor={"2px solid black"}
        >
          <option value="">Select category</option>
          {category?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Input
          w={"max-content"}
          type="date"
          onChange={handleDate}
          borderColor={"2px solid black"}
        ></Input>
      </Flex>
      <Flex direction={"column"} alignContent={"center"} w={"full"}>
        <ChartReport salesCat={salesCat} category={category} />
        <TableSales table={table} />
      </Flex>
    </Flex>
  );
};
