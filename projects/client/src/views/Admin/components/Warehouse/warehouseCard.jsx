import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Divider,
  Button,
  Image,
  VStack,
  Flex,
} from '@chakra-ui/react';
import {EditWarehouseModal} from './editWarehouseModal';
import {DeleteWarehouseModal} from './deleteWarehouseModal';
import axios from '../../../../api/axios';

export const WarehouseCard = ({ data,setReload,reload }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const handleEditClick = () => {
    setIsEditModalOpen(true);
    console.log(data);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };
  
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      shadow="md"
      bg={"white"}
      minW={"200px"}
    >
      <VStack>

      <Heading size="md" mb="2">
        {data.name}
      </Heading>
      <Image src={`http://localhost:8000/warehouseImg/${data?.image}`}  height={"140px"} width={"140px"}
    objectFit='cover' borderRadius={"10px"}/>
    </VStack>
    <Flex h={"50px"}>

      <Text color="gray.500" fontSize={"16px"}>{data.address.address}, {data.address.nama_kota}, {data.address.nama_provinsi}, {data.address.kode_pos}</Text>
    </Flex>
     
        <Divider my="3" />
      <Text as={Button} onClick={handleEditClick} mt="3" bg={"transparent"} _hover={{bg:"transparent"}}>
        Edit
      </Text >
      <Text as={Button} onClick={handleDeleteClick} mt="3" color="red" bg={"transparent"} _hover={{bg:"transparent"}}>
        Delete
      </Text>

      <EditWarehouseModal
        data={data}
        city={data.address.kota}
        provinces={data.address.provinsi}
        reload={reload}
        setReload={setReload}        
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
      <DeleteWarehouseModal
        isOpen={isDeleteModalOpen}
        warehouseName={data.name}
        setReload={setReload}
        reload={reload}
        id={data.id}
        onClose={handleDeleteModalClose}
      />
    </Box>
  );
};
