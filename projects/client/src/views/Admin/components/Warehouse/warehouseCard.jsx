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
import axios from 'axios';

export const WarehouseCard = ({ data,setReload,reload }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
 const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const getCity = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/location/city`,
        data
      );
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/location/province`,
        data
      );
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    getCity();
    getProvince();
  }, []); 
  useEffect(() => {
    setDataCities(cities);
    setDataProvince(province);
  }, [cities, province]);
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
      <Image src={`http://localhost:8000/warehouseImg/${data.image}`}  height={"140px"} width={"140px"}
    objectFit='cover' />
    </VStack>
    <Flex h={"50px"}>

      <Text color="gray.500" fontSize={"16px"}>{data.address.address}, {cities[data.address.kota-1]?.city_name}, {province[data.address.provinsi-1]?.province}, {data.address.kode_pos}</Text>
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
