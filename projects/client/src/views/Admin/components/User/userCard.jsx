
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BiSolidUser, BiSolidUserDetail } from 'react-icons/bi';
import { UserProfileModal } from './userProfileModal';
import { FaWarehouse } from 'react-icons/fa';
import { PaginationAddress } from '../pagination';
import { useLocation } from 'react-router-dom';

export const UserCard = () => {
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
        const response = await axios.get(`http://localhost:8000/api/user/list-user?&page=${currentPage}`);
        console.log(response.data.result);
        setUser(response.data.result);
        setPage(response.data.totalPage)
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
    const handleProfileClick = (user) => {
        setSelectedUser(user);
        getProfile(user.id)
        setIsModalOpen(true);
    };
   
    useEffect(() => {
      getUser();
      getProfile()
    }, [currentPage]);
  return (
    <>
    <Heading py={5} ml={5}>
        User List
    </Heading>
    <Stack py={6} mx={3}  gap={4}>
        {user?.map((item)=>(
            
            <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={{ sm: '100%', lg: '100%', md:"100%", xl:"100%"}}
            height={{ base: "fit-content",sm:"fit-content", md: '12rem', lg:"13rem"}}
            direction={{ base: 'column',sm:"row", md: 'row' }}
        bg={'white'}
        boxShadow={'2xl'}
        padding={4}>
        <Flex bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
                'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt="#"
          />
        </Flex>
        <Box>

          <Heading fontSize={'xl'} fontFamily={'body'}>
            {item.name} 
          </Heading>
          {item.isVerified ? (
                      <Badge colorScheme="green" variant={"subtle"} ml={1} color={"green.400"}>
                        Verified
                      </Badge>
                    ) : (
                        <Badge colorScheme="red"variant={"subtle"} ml={1} color={"red.400"}>
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

                <BiSolidUser/>
      <Text fontWeight={600} color={'black'} size="sm">
        User
      </Text>
                </HStack>
    )}
    {item.roleId === 2 && (
        <HStack>
        <FaWarehouse/>
      <Text fontWeight={600} color={'black'} size="sm">
        Warehouse Admin
      </Text>
        </HStack>
    )}
    <UnorderedList>
        <ListItem>
          <Text fontWeight={600} color={'black'} size="sm">
            {item.email}
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight={600} color={'black'} size="sm">
            Phone Number
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight={600} color={'black'} size="sm">
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
          <PaginationAddress totalpage={page}/>  
    </>
  )
}