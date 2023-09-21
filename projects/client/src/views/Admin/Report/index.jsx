import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { StockHistory } from "../components/Report/stockHistory";
import { ProductWarehouse } from "../components/Report/productWarehouse";

export const Report = () => {
  return (
    <>
      <Tabs isLazy>
        <TabList>
          <Tab>Stock History</Tab>
          <Tab>Product warehouse</Tab>
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
