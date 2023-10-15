import { Avatar, Badge, Button, Flex } from "@chakra-ui/react"
import { Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react"
import { BiSolidUserDetail } from "react-icons/bi"
import { useEffect, useState } from "react";
import { UserProfileModal } from "./userProfileModal";
import { PaginationAddress } from "../pagination";
import { UserCard } from "./userCard";
import { useLocation } from "react-router-dom";
import axios from "../../../../api/axios";

export const ListUser = () => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const sort = params.get("sort") || "";
    const currentPage = Number(params.get("page")) || 1
    const [page,setPage] = useState([])
    
    const getUser = async () => {
      try {
        const response = await axios.get(`/user/list-user?&page=${currentPage}`);
        setUser(response.data.result);
        setPage(response.data.totalPage)

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
        getProfile(user.id)
        setIsModalOpen(true);
    };
   
    useEffect(() => {
      getUser();
      getProfile()
    }, [currentPage]);
    return(
      <>
      <UserCard/>
      <TableContainer m={2}>
        <Table alignContent={"center"}>
          <Tr bg={"#517664"} borderRadius={5}>
            <Th color={"white"} fontWeight={"bold"} width={"2px"}>
              No
            </Th>
            <Th color={"white"} fontWeight={"bold"} width={8}>
              Name
            </Th>
            <Th color={"#d6e5e3"} fontWeight={"bold"} width={8}></Th>
            <Th color={"#d6e5e3"} fontWeight={"bold"} width={8}></Th>
          </Tr>
          {user?.map((item, index) => (
            <Tbody>
              <Td mx={"auto"} color={"#2d3319"} width={"2px"}>
                {index + 1}
              </Td>

              <Td mx={"auto"} color={"#2d3319"}>
                <Flex alignItems="center">
                  <Avatar
                    src={item.profileImg}
                    name={item.name}
                    alt={`${item.name}'s avatar`}
                    boxSize="35px"
                    borderRadius="full"
                    mr={2}
                    />
                  {item.name}
                    </Flex>
                  </Td>
                  <Td>

                    {item.isVerified ? (
                      <Badge colorScheme="green" variant={"subtle"} ml={2} color={"green.400"}>
                        Verified
                      </Badge>
                    ) : (
                      <Badge colorScheme="red"variant={"subtle"} ml={2} color={"red.400"}>
                        Not Verified
                      </Badge>
                    )}
                    </Td>
              <Td>
                <Button
                  onClick={() => handleProfileClick(item)}
                  color={"#2d3319"}
                  bg={"transparent"}
                >
                  <BiSolidUserDetail />
                </Button>
              </Td>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
      <PaginationAddress totalpage={page}/>  
      <UserProfileModal
        user={selectedUser}
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
    )
}