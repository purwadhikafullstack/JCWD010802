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
  const [chart, setChart] = useState();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [table, setTable] = useState();
  const [warehouse, setWarehouse] = useState([]);
  const warehouseId = params.get("warehouseId") || "";
  const categoryId = params.get("categoryId") || "1";
  const productId = params.get("productId") || "";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; 
  if (month < 10) {
    month = `0${month}`; 
  }
  const todayDate = `${year}-${month}`;
  const date = params.get("date") || todayDate;
  const user = useSelector((state) => state.user.value);

  const getChartReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sales/chart?warehouseId=${warehouseId}&categoryId=${categoryId}&productId=${productId}&date=${date}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setChart(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getTableSales = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sales/table-sales?warehouseId=${warehouseId}&categoryId=${categoryId}&productId=${productId}&date=${date}`,
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
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product?limit=9999`
      );
      setProduct(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleWarehouseChange = (e) => {
    navigate(
      `?warehouseId=${e.target.value}&categoryId=${categoryId}&productId=${productId}&date=${date}`
    );
  };
  const handleCategory = (e) => {
    navigate(
      `?warehouseId=${warehouseId}&categoryId=${e.target.value}&productId=${productId}&date=${date}`
    );
  };
  const handleProduct = (e) => {
    navigate(
      `?warehouseId=${warehouseId}&categoryId=${categoryId}&productId=${e.target.value}&date=${date}`
    );
  };
  const handleDate = (e) => {
    navigate(
      `?warehouseId=${warehouseId}&categoryId=${categoryId}&productId=${productId}&date=${e.target.value}`
    );
  };
  useEffect(() => {
    getChartReport();
    getTableSales();
    getWarehouse();
    getCategory();
    getProduct();
  }, [warehouseId, categoryId, productId, date]);
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
          defaultValuevalue={categoryId}
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
        <Select
          id="productSelect"
          defaultValue={productId}
          onChange={handleProduct}
          maxWidth="200px"
          borderColor={"2px solid black"}
        >
          <option value="">Select product</option>
          {product?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Input
          w={"max-content"}
          type="month"
          onChange={handleDate}
          borderColor={"2px solid black"}
        ></Input>
      </Flex>
      <Flex direction={"column"} alignContent={"center"} w={"full"}>
        <ChartReport category={category} chart={chart} />
        <TableSales table={table} />
      </Flex>
    </Flex>
  );
};
