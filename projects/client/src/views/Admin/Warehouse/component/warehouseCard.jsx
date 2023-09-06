import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Divider,
  Button,
  Image,
} from '@chakra-ui/react';
import {EditWarehouseModal} from './editWarehouseModal';
import {DeleteWarehouseModal} from './deleteWarehouseModal'; 

export const WarehouseCard = ({ data }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDetailsClick = () => {
    setIsDetailsModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      shadow="md"
      width="300px"
    >
      <Heading size="md" mb="2">
        {data.name}
      </Heading>
      <Image src={data.image}/>
      <Text color="gray.500">{data.location}</Text>
     
        <Divider my="3" />
      <Text as={Button} onClick={handleEditClick} mt="3" bg={"transparent"} _hover={{bg:"transparent"}}>
        Edit
      </Text >
      <Text as={Button} onClick={handleDeleteClick} mt="3" color="red" bg={"transparent"} _hover={{bg:"transparent"}}>
        Delete
      </Text>

      <EditWarehouseModal
        data={data}
        onSave={(editedData) => {
          console.log('Edited Data:', editedData);
        }}
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
      <DeleteWarehouseModal
        isOpen={isDeleteModalOpen}
        onDelete={() => {
          console.log('Deleting warehouse:', data.name);
          setIsDeleteModalOpen(false);
        }}
        onClose={handleDeleteModalClose}
      />
    </Box>
  );
};
