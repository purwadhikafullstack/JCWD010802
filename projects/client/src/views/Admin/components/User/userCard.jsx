import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  ListItem,
  Select,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSolidUser, BiSolidUserDetail } from "react-icons/bi";
import { UserProfileModal } from "./userProfileModal";
import { FaImage, FaWarehouse } from "react-icons/fa";
import { PaginationAddress } from "../pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";

export const UserCard = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const roleId = params.get("roleId") || "";
  const currentPage = Number(params.get("page")) || 1;
  const [page, setPage] = useState([]);
  const navigate = useNavigate();
  const defaultAvatar = "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
  const getUser = async () => {
    try {
      const response = await axios.get(`/user/list-user?&page=${currentPage}&roleId=${roleId}`);
      console.log(response.data.result);
      setUser(response.data.result);
      setPage(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      setProfile(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfileClick = (user) => {
    setSelectedUser(user);
    getProfile(user.id);
    setIsModalOpen(true);
  };
  const handleRoleChange = (e) => {
    navigate(`?roleId=${e.target.value}`);
  };
  useEffect(() => {
    getUser();
    getProfile();
  }, [currentPage, roleId]);
  return (
    <>
      <Heading py={5} ml={5}>
        User List
      </Heading>
      <Box py={3} ml={5}>
        <Text htmlFor="roleSelect">Filter by Role: </Text>
        <Select
          id="roleSelect"
          name="roleSelect"
          onChange={handleRoleChange}
          value={roleId}
          maxWidth="200px"
        >
          <option value="">All</option>
          <option value="1">User</option>
          <option value="2">Warehouse Admin</option>
        </Select>
      </Box>
      <Stack py={6} mx={3} gap={4}>
        {user?.map((item) => (
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={{ sm: "100%", lg: "100%", md: "100%", xl: "100%" }}
            height={{
              base: "fit-content",
              sm: "fit-content",
              md: "12rem",
              lg: "13rem",
            }}
            direction={{ base: "column", sm: "row", md: "row" }}
            bg={"white"}
            boxShadow={"2xl"}
            padding={4}
          >
            <Flex >
            {item.profileImg ? (
      <Image
      objectFit="cover"
      boxSize="100%"        
      src={`http://localhost:8000/profileImg/${item.profileImg}`}
        alt="profile image"
      />
    ) : (
      <Image
        src={defaultAvatar}
        alt="default avatar"
        objectFit="cover"
        boxSize="100%"      />
    )}
            </Flex>
            <Box>
              <Heading fontSize={"xl"} fontFamily={"body"}>
                {item.name}
              </Heading>
              {item.isVerified ? (
                <Badge
                  colorScheme="green"
                  variant={"subtle"}
                  ml={1}
                  color={"green.400"}
                >
                  Verified
                </Badge>
              ) : (
                <Badge
                  colorScheme="red"
                  variant={"subtle"}
                  ml={1}
                  color={"red.400"}
                >
                  Not Verified
                </Badge>
              )}
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                p={1}
              >
                {item.roleId === 1 && (
                  <HStack>
                    <BiSolidUser />
                    <Text fontWeight={600} color={"black"} size="sm">
                      User
                    </Text>
                  </HStack>
                )}
                {item.roleId === 2 && (
                  <HStack>
                    <FaWarehouse />
                    <Text fontWeight={600} color={"black"} size="sm">
                      Warehouse Admin
                    </Text>
                  </HStack>
                )}
                <UnorderedList>
                  <ListItem>
                    <Text fontWeight={600} color={"black"} size="sm">
                      {item.email}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight={600} color={"black"} size="sm">
                      Phone Number
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight={600} color={"black"} size="sm">
                      BirthDate
                    </Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
            </Box>
            <Flex flex={2} justifyContent={"flex-end"}>
              <Button
                onClick={() => handleProfileClick(item)}
                color={"#2d3319"}
                bg={"transparent"}
              >
                <BiSolidUserDetail />
              </Button>
            </Flex>
          </Stack>
        ))}
      </Stack>
      <UserProfileModal
        user={selectedUser}
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <PaginationAddress totalpage={page} />
    </>
  );
};
