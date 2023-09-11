import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button,Flex,Box,Heading,Text,VStack,Card,Image, Select,} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export const WarehouseStockList = () => {
    const navigate = useNavigate()
    const [warehouse, setWarehouse] = useState([])
    const [cities, setCities] = useState([]);
    const [province, setProvince] = useState([]);

    const getWarehouse = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/warehouse/list`);
          console.log(response);
          setWarehouse(response.data);
        } catch (error) {
          console.log(error);
        }
    };

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
    const handleClick = (id) => {
        navigate(`/admin/warehouse-stock/${id}`)
    }
    useEffect(() => {
        getWarehouse()
        getCity()
        getProvince()
    }, [])
    return (
        <VStack spacing={4} alignItems="stretch" p="20px">
        <Heading fontSize="22px">Warehouse</Heading>
        <ToastContainer />
        {warehouse?.map((item, index) => (
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
                onClick={() => handleClick(item.id)}
              >
                <Flex alignItems="center">
                  <Image
                    objectFit="cover"
                    src={
                      `http://localhost:8000/warehouseImg/${item.image}`
                    }
                    alt="#"
                    boxSize="100px" 
                  />
                  <Box ml={4}>
                    <Heading as="h2" size="md">
                      {item.name}
                    </Heading>
                    <Text color="gray.500">
                        {`${item.address.address}, ${cities[item.address.kota - 1]?.city_name}, ${province[item.address.provinsi - 1]?.province}`}
                    </Text>
                  </Box>
                </Flex>
                <Flex justifyContent={["left", "left", "flex-start"]} mt={4} flexWrap="wrap">
          </Flex>
              </Card>
        ))}
        {/* <PaginationAddress totalpage={page} /> */}
      </VStack>
    )
}