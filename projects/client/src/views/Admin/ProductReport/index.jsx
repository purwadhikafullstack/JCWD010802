import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import { ProductWarehouse } from "../components/ProductReport/productWarehouse";
import { StockHistory } from "../components/ProductReport/stockHistory";

export const ProductReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("search");
    searchParams.delete("warehouseId");
    searchParams.delete("monthly");
    navigate(`?${searchParams.toString()}`);
  };

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
            <StockHistory />
          </TabPanel>
          <TabPanel>
            <ProductWarehouse />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
