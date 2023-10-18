import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ProfileCard } from "./components/Profile";
import { AddressCard } from "./components/Address";
import { OrderList } from "./components/OrderList";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const ProfileView = () => {
  const data = useSelector(state=>state.user.value)
  const location = useLocation();
    const { hash } = location;
    const navigate = useNavigate();

    const getTabFromHash = (hash) => {
      switch (hash) {
        case "#address":
          return 1;
        case "#myorder":
          return 2;
        default:
          return 0;
        }
    };
    const activeTab = getTabFromHash(hash);
    const user = useSelector((state) => state.user.value);
    if (user.isVerified) {

  return (
   <Flex p={5} justify={{base: "flex-start", lg: "center"}} bgColor={"#edf3f8"} direction={{base:"column", md:"row"}} minH={"100vh"} pt={"100px"}>
    <Tabs isFitted variant='enclosed' index={activeTab}>
      <TabList >
        <Tab bgColor={"white"} onClick={() => navigate("/profile")}>Profile</Tab>
        <Tab bgColor={"white"} onClick={() => navigate("/profile#address")}>Address</Tab>
        {data.roleId === 1 ? (
          <Tab bgColor={"white"} onClick={() => navigate("/profile#myorder")}>My Order</Tab>
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
  )}else{
    return (
    <Navigate to="/login" state={{ from: location }} replace/>)
  }

};
