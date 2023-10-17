import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import { ProductWarehouse } from "../components/ProductReport/productWarehouse";
import { StockHistory } from "../components/ProductReport/stockHistory";
import axios from "../../../api/axios";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const ProductReport = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [historyStock, setHistoryStock] = useState();
  const [historyProduct, setHistoryProduct] = useState();
  const [pageStock, setPageStock] = useState([]);
  const [pageProduct, setPageProduct] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const warehouseId = params.get("warehouseId") || "";
  const monthly = params.get("monthly") || "";
  const currentPage = Number(params.get("page")) || 1;
  const [resetSearch, setResetSearch] = useState("");
  const [resetWarehouseId, setResetWarehouseId] = useState("");
  const [resetMonthly, setResetMonthly] = useState("");

  const getStockHistory = async () => {
    try {
      const response = await axios.get(
        `/report?search=${search}&warehouseId=${warehouseId}&monthly=${monthly}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHistoryStock(response.data.result);
      setPageStock(response.data.totalpage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load stock histories!")
    }
  };
  const getProductWarehouse = async () => {
    try {
      const response = await axios.get(
        `/report/product?search=${search}&warehouseId=${warehouseId}&monthly=${monthly}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHistoryProduct(response.data.groupedResults);
      setPageProduct(response.data.totalpage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product stock!")
    }
  };
  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `/warehouse/list`
      );
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setResetSearch(e.target.value);
    navigate(
      `?search=${e.target.value}&warehouseId=${resetWarehouseId}&monthly=${resetMonthly}&page=1`
    );
  };

  const handleWarehouseChange = (e) => {
    setResetWarehouseId(e.target.value);
    navigate(
      `?search=${resetSearch}&warehouseId=${e.target.value}&monthly=${resetMonthly}&page=1`
    );
  };

  const handleMonthly = (e) => {
    setResetMonthly(e.target.value);
    navigate(
      `?search=${resetSearch}&warehouseId=${resetWarehouseId}&monthly=${e.target.value}&page=1`
    );
  };

  const handleReset = () => {
    setResetSearch("");
    setResetWarehouseId("");
    setResetMonthly("");
    navigate(`?page=1`);
  };

  useEffect(() => {
    getStockHistory();
    getProductWarehouse();
    getWarehouse();
  }, [search, warehouseId, currentPage, monthly]);

  const handleTabChange = useCallback((index) => {
    setSelectedTab(index);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("search");
    searchParams.delete("warehouseId");
    searchParams.delete("monthly");
    setResetSearch("");
    setResetWarehouseId("");
    setResetMonthly("");
    navigate(`?${searchParams.toString()}`);
  });

  useEffect(() => {}, [handleTabChange]);
  return (
    <>
      <Tabs isLazy index={selectedTab} onChange={handleTabChange}>
        <TabList>
          <Tab>Stock History</Tab>
          <Tab>Product Warehouse</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StockHistory
              history={historyStock}
              page={pageStock}
              search={resetSearch}
              warehouse={warehouse}
              warehouseId={resetWarehouseId}
              monthly={resetMonthly}
              handleSearch={handleSearch}
              handleWarehouseChange={handleWarehouseChange}
              handleMonthly={handleMonthly}
              handleReset={handleReset}
            />
          </TabPanel>
          <TabPanel>
            <ProductWarehouse
              history={historyProduct}
              page={pageProduct}
              search={resetSearch}
              warehouse={warehouse}
              warehouseId={resetWarehouseId}
              monthly={resetMonthly}
              handleSearch={handleSearch}
              handleWarehouseChange={handleWarehouseChange}
              handleMonthly={handleMonthly}
              handleReset={handleReset}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
