
import React, { useEffect, useState } from "react";
import {Button,Flex,Box,Heading,Text,VStack,Card,Image, Select, HStack, Input,InputGroup,InputLeftElement,Icon,Stack, useSafeLayoutEffect,} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminMenu } from "./adminMenu";
import { UserProfileModal } from "../User/userProfileModal";
import { PaginationAddress } from "../pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteUserModal } from "./deleteAdmin";
import { AdminEditForm } from "./editAdmin";
import { BsSearch } from "react-icons/bs";
import axios from "../../../../api/axios";

export const ListAdmin = ({reload,setReload}) => {
  const [admin, setAdmin] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [profile, setProfile] = useState([]);
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const warehouseId = params.get("warehouseId") || "";
  const currentPage = Number(params.get("page")) || 1;
  const [page, setPage] = useState([]);
  const navigate = useNavigate()
  const defaultAvatar = "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
  const getAdmin = async () => {
    try {
      const response = await axios.get(`/admin/profile?search=${search}&page=${currentPage}&warehouseId=${warehouseId}`);
      setAdmin(response.data.result);
      setPage(response.data.totalPage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load admins!")

    } };
  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      setProfile(response.data.result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load  admin profile!")

    }};
  const updateAdminData = (editedAdminData) => {
    setAdmin((prevAdmin) =>
      prevAdmin.map((adminItem) =>
        adminItem.user.id === editedAdminData.user.id
          ? { ...adminItem, ...editedAdminData }
          : adminItem)
    );
    setIsModalOpen(false);};

     const handleWarehouseChange = (e) => {
      navigate(`?warehouseId=${e.target.value}&search=${search}`)
  };
  const handleSearch = (result) => {
    navigate(`?search=${result.target.value}&warehouseId=${warehouseId}`);
}
  const handleDeleteUser = async () => {
    try {
      if (!adminToDelete) {
        console.error("No admin selected for deletion.");
        return;}
      const response = await axios.delete(`/admin/${adminToDelete.user.id}`);
      if (response.status === 200) {
        toast.success('Admin deleted successfully', {
          position: 'top-right',
          autoClose: 2000, })
        setAdmin((prevAdmin) => prevAdmin.filter((item) => item.id !== adminToDelete.id));
      } else {
        console.error('Failed to delete admin');}
      setIsModalOpenDel(false); 
      setAdminToDelete(null); 
    } catch (error) {
      console.error('Error deleting admin:', error);
    }};
  const handleProfileClick = (admin) => {
    setSelectedUser(admin.user);
    getProfile(admin?.userId);
    setIsModalOpen(true);
  };
  const changeWarehouse = async (userId, selectedWarehouse) => {
    try {
      const response = await axios.patch(`/admin/warehouse/${userId}`, {warehouse: selectedWarehouse})
      if (response.status === 200) {
        toast.success("Warehouse changed successfully", {
          position: "top-right",
          autoClose: 1000,
        })}
    } catch (error) {
      console.error(error);}
  }
  const getWarehouse = async () => {
    try {
      const response = await axios.get(`/warehouse/list`);
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load warehouse list!")
    }};
  const toggleMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleMenuItemClick = (index, menuItem, menuId) => {
    setSelectedMenuItemIndex((prevSelected) => ({
      ...prevSelected,
      [index]: menuItem,
    }));
    toggleMenu(index);
    changeWarehouse(admin[index].user.id, menuId);
    setOpenMenuIndex(null);
  };
  useEffect(() => {
    getAdmin();
    getWarehouse();
    getProfile();
  }, [currentPage, warehouseId,search,reload]);
  return (
    <>
    
    <ToastContainer />
      <HStack px={5} >
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
                w="40%"
            />
            <InputLeftElement>
                <Icon as={BsSearch} color={"gray.500"} />
            </InputLeftElement>
        </InputGroup>
      <Select
        id="warehouseSelect"
        placeholder="Warehouse"
        value={warehouseId}
        borderColor={"2px solid black"}
        onChange={handleWarehouseChange}
        maxWidth="200px">
        <option value="">All warehouses</option>
        {warehouse.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </Select>
      </HStack>
        <Stack py={6}  gap={4} mx={3} >
      {admin?.map((item, index) => (
        <Card
        key={item.id}
        p={4} width={["100%", "100%", "100%", "100%"]} shadow="md"  mx={"auto"} position="relative" display="flex" flexDirection="column">
              <Flex alignItems="center">
              {item.user.profileImg ? (
                <Image
                objectFit="cover"
                borderRadius={"10px"} 
                src={`${process.env.REACT_APP_BASE_URL}/profileImg/${item.user.profileImg}`}
                alt="profile image"
        boxSize="100px"
        aspectRatio={1}
        />
        ) : (
          <Image
          objectFit="cover"
          src={defaultAvatar}
          alt="default avatar"
        boxSize="100px"
        />
    )}
                <Box ml={4}>
                  <Heading as="h2" size="md">
                    {item.user?.name}
                  </Heading>
                  <Text color="gray.500">
                    {selectedMenuItemIndex[index] || item.warehouse?.name}
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent={["left", "left", "flex-start"]} mt={4} flexWrap="wrap">
          <Button
            mb={[2, 2, 0]}
            onClick={() => handleProfileClick(item)}
            color={"#2d3319"}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            mr={[0, 0, 2]} >
            Profile
          </Button>
          <AdminEditForm admin={item} onUpdateAdmin={updateAdminData}  />
          <AdminMenu
              index={index}
              toggleMenu={toggleMenu}
              handleMenuItemClick={handleMenuItemClick}
              warehouse={warehouse}/>
          <Button
            mb={[2, 2, 0]}
            color="red.500"
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            mr={[0, 0, 2]} 
            onClick={() => {
              setAdminToDelete(item);
              setSelectedUser(item)
              setIsModalOpenDel(true);
            }}>
            Delete Admin
          </Button>
        </Flex>
            </Card>
        ))}
        </Stack>
      <UserProfileModal
        user={selectedUser}
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}/>
      <DeleteUserModal
        isOpen={isModalOpenDel}
        adminName={selectedUser?.user?.name}
        onClose={() => {
          setIsModalOpenDel(false);
          setAdminToDelete(null); }}
          onDelete={handleDeleteUser}/>
      <PaginationAddress totalpage={page} />
          </>
  );
};
