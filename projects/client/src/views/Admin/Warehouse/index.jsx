import React, { useState } from 'react';
import { Container, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import { WarehouseCard } from "./component/warehouseCard";
import {AddWarehouseModal} from "./component/addWarehouseModal";

export const WarehousePageView = () => {
  const dummyData = [
    {
      name: 'Warehouse 1',
      location: 'New York, NY',
      image: "https://cms.ar-racking.com/uploads/2020/06/2023-3.jpg",
      tags: ['Electronics', 'Clothing', 'Furniture'],
    },
    {
      name: 'Warehouse 2',
      location: 'Los Angeles, CA',
      image: "https://cms.ar-racking.com/uploads/2020/06/2023-3.jpg",
      tags: ['Appliances', 'Toys'],
    },
    {
      name: 'Warehouse 2',
      location: 'Los Angeles, CA',
      image: "https://cms.ar-racking.com/uploads/2020/06/2023-3.jpg",
      tags: ['Appliances', 'Toys'],
    },
    {
      name: 'Warehouse 2',
      location: 'Los Angeles, CA',
      image: "https://cms.ar-racking.com/uploads/2020/06/2023-3.jpg",
      tags: ['Appliances', 'Toys'],
    },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

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
          gap={4}
        >
          {dummyData.map((warehouse, index) => (
            <GridItem key={index}>
              <WarehouseCard data={warehouse} />
            </GridItem>
          ))}
        </Grid>
      </Container>

      {/* Render AddWarehouseModal */}
      <AddWarehouseModal
        isOpen={isAddModalOpen}
        onAdd={(newWarehouse) => {
          // Handle adding the new warehouse data here
          console.log('Added Warehouse:', newWarehouse);
          closeAddModal(); // Close the modal after adding
        }}
        onClose={closeAddModal}
      />
    </>
  );
}
