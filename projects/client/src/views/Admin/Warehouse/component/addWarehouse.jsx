import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  Badge,
  Input,
} from '@chakra-ui/react';

const initialFormData = {
  name: '',
  location: '', // You can pre-populate options as in the EditWarehouse component
};

export const AddWarehouse = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    onAdd(formData);
    setFormData(initialFormData); // Clear the form after adding
  };

  const handleCancel = () => {
    onCancel();
    setFormData(initialFormData); // Clear the form on cancel
  };

  return (
    <>
      
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mt="3">
          <FormLabel>Province</FormLabel>
          <Select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          >
            <option value="Location 1">Province 1</option>
            <option value="Location 2">Province 2</option>
            <option value="Location 3">Province 3</option>
          </Select>
        </FormControl>
        <FormControl mt="3">
          <FormLabel>City</FormLabel>
          <Select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          >
            <option value="Location 1">Province 1</option>
            <option value="Location 2">Province 2</option>
            <option value="Location 3">Province 3</option>
          </Select>
        </FormControl>
        <FormControl mt={"3"}>
          <FormLabel>Image</FormLabel>
          <Input
            type="file"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </FormControl>
        
        <Stack direction="row" spacing="2" mt="3" justifyContent="flex-end">
          <Button colorScheme="red" onClick={handleCancel}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleAdd}>
            Add
          </Button>
        </Stack>
    </>
  );
};
