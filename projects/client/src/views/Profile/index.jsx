import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ProfileCard } from "./components/Profile";
import { AddressCard } from "./components/Address";
import { OrderList } from "./components/OrderList";

export const ProfileView = () => {
  return (
   <Flex p={5} justify={{base: "flex-start", lg: "center"}} bgColor={"#cacfd6"} direction={{base:"column", md:"row"}} minH={"100vh"} pt={"100px"}>
    <Tabs isFitted variant='enclosed' >
      <TabList >
        <Tab bgColor={"white"}>Profile</Tab>
        <Tab bgColor={"white"}>Address</Tab>
        <Tab bgColor={"white"}>My Order</Tab>
      </TabList>
      <TabPanels>
        <TabPanel width={{base: "auto",lg: "1000px"}}>
          <ProfileCard />
        </TabPanel>
        <TabPanel width={{base: "auto",lg: "1000px"}}>
          <AddressCard/>
        </TabPanel>
        <TabPanel width={{base: "auto",lg: "1000px"}}>
          <OrderList />
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Flex>
  );
};
