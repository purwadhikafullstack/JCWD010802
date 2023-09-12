import React, { useEffect, useState } from 'react';
import { Container, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import axios from 'axios';
import { WarehouseCard} from '../components/Warehouse/warehouseCard';
import { AddWarehouseModal} from '../components/Warehouse/addWarehouseModal';
import { useLocation } from 'react-router-dom';
import { PaginationAddress } from '../../../components/pagination/paginationAddress';


export const WarehousePageView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = Number(params.get("page")) || 1;
  const [warehouse, setWarehouse] = useState([])
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState([]);

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/warehouse?page=${currentPage}`);
      setWarehouse(response.data.result);
      setPage(response.data.totalpage);
    } catch (error) {
      console.log(error);
    }
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  useEffect (()=>{
    getWarehouse()
  },[reload,currentPage])
  return (
    <>
      <Container maxW="container.lg" mt="4">
        <Flex justifyContent={"flex-end"}>
        <Button bg="#517664" onClick={openAddModal} mb={3} color={"white"} _hover={{bg:"#2d3319"}}>
          + Add Warehouse
        </Button>
        </Flex>
        <Grid
          templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={4} py={4}
        >
          {warehouse.map((warehouse, index) => (
            <GridItem key={index}>
              <WarehouseCard data={warehouse} reload={reload} setReload={setReload} />
            </GridItem>
          ))}
        </Grid>
      </Container>

      <AddWarehouseModal
        isOpen={isAddModalOpen}
        reload={reload} setReload={setReload}
        onClose={closeAddModal}
      />
      <PaginationAddress totalpage={page} />

    </>
  );
}
