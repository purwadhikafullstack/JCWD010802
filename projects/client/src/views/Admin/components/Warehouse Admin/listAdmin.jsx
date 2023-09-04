import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button,Flex,Box,Heading,Text,VStack,Card,Image,} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminMenu } from "./adminMenu";
import { UserProfileModal } from "../User/userProfileModal";
import { PaginationAddress } from "../pagination";
import { useLocation } from "react-router-dom";
import { DeleteUserModal } from "./deleteAdmin";

export const ListAdmin = () => {
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
  const currentPage = Number(params.get("page")) || 1;
  const [page, setPage] = useState([]);

  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/profile?&page=${currentPage}`
      );
      console.log(response);
      setAdmin(response.data.result);
      setPage(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
      console.log(response.data.result);
      setProfile(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!adminToDelete) {
        console.error("No admin selected for deletion.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/admin/${adminToDelete.user.id}`
      );
      console.log(adminToDelete);

      if (response.status === 200) {
        toast.success('Admin deleted successfully', {
          position: 'top-right',
          autoClose: 2000, 
        })
        setAdmin((prevAdmin) => prevAdmin.filter((item) => item.id !== adminToDelete.id));
        console.log('Admin deleted successfully');
      } else {
        console.error('Failed to delete admin');
      }

      setIsModalOpenDel(false); 
      setAdminToDelete(null); 
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleProfileClick = (admin) => {
    setSelectedUser(admin.user);
    getProfile(admin.userId);
    setIsModalOpen(true);
  };

  const changeWarehouse = async (userId, selectedWarehouse) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/admin/${userId}`,
        {
          warehouse: selectedWarehouse,
        }
      );
      if (response.status === 200) {
        toast.success("Warehouse changed successfully", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/warehouse`);
      console.log(response);
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
    getWarehouse();
    getProfile();
  }, [currentPage]);

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

  return (
    <VStack spacing={4} alignItems="stretch">
      <ToastContainer />
      {admin?.map((item, index) => (
              <Card
              key={item.id}
              p={4}
              width={["100%", "100%", "100%", "100%"]} 
              shadow="md"
              borderWidth="1px"
              mx={"auto"}
              position="relative"
              display="flex"
              flexDirection="column"
            >
              <Flex alignItems="center">
                <Image
                  objectFit="cover"
                  src={
                    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  }
                  alt="#"
                  boxSize="100px" // Adjust image size
                />
                <Box ml={4}>
                  <Heading as="h2" size="md">
                    {item.user.name}
                  </Heading>
                  <Text color="gray.500">
                    {selectedMenuItemIndex[index] || item.warehouse.name}
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
            mr={[0, 0, 2]} // Add margin to separate buttons
          >
            Profile
          </Button>
          <Button
            mb={[2, 2, 0]}
            color="#2d3319"
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            mr={[0, 0, 2]} // Add margin to separate buttons
          >
            Edit
          </Button>
            <AdminMenu
              index={index}
              toggleMenu={toggleMenu}
              handleMenuItemClick={handleMenuItemClick}
              warehouse={warehouse}
            />
          <Button
            mb={[2, 2, 0]}
            color="red.500"
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            mr={[0, 0, 2]} 
            onClick={() => {
              setAdminToDelete(item);
              setSelectedUser(item)
              console.log(item);
              setIsModalOpenDel(true);
            }}
          >
            Delete Admin
          </Button>
        </Flex>
            </Card>
      ))}
      <UserProfileModal
        user={selectedUser}
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <DeleteUserModal
        isOpen={isModalOpenDel}
        adminName={selectedUser?.user.name}
        onClose={() => {
          setIsModalOpenDel(false);
          setAdminToDelete(null); // Reset adminToDelete
        }}
        onDelete={handleDeleteUser}
      />
      <PaginationAddress totalpage={page} />
    </VStack>
  );
};
