import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ProfileCard } from "./components/Profile";
import { AddressCard } from "./components/Address";
import { OrderList } from "./components/OrderList";
import { useSelector } from "react-redux";

export const ProfileView = () => {
  const data = useSelector(state=>state.user.value)
  return (
   <Flex p={5} justify={{base: "flex-start", lg: "center"}} bgColor={"#edf3f8"} direction={{base:"column", md:"row"}} minH={"100vh"} pt={"100px"}>
    <Tabs isFitted variant='enclosed' >
      <TabList >
        <Tab bgColor={"white"}>Profile</Tab>
        <Tab bgColor={"white"}>Address</Tab>
        {data.roleId===1?(
          <Tab bgColor={"white"}>My Order</Tab>
        ):(
          null
        )}
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
