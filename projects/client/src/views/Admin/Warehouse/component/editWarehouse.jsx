import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  Badge,
  Select,
} from '@chakra-ui/react';

export const EditWarehouse = ({ data, onSave, onClose }) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedData);
    onClose()
  };

  return (
    <>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={editedData.name}
          onChange={handleInputChange}
          />
      </FormControl>
      <FormControl mt="3">
        <FormLabel>Addres</FormLabel>
        <Input
          type="text"
          name="location"
          value={editedData.location}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt="3">
        <FormLabel>Province</FormLabel>
        <Select
          name="location"
          value={editedData.location}
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
          value={editedData.location}
          onChange={handleInputChange}
        >
          <option value="Location 1">City 1</option>
          <option value="Location 2">City 2</option>
          <option value="Location 3">City 3</option>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
      <FormControl mt="3">
        <FormLabel>Image</FormLabel>
        <Input
          type="file"
          name="image"
          onChange={handleInputChange}
        />
      </FormControl>
      <Stack direction="row" spacing="2" mt="3" justifyContent="flex-end">
        <Button colorScheme="green" onClick={handleSave} w={"full"}>
          Save
        </Button>
      </Stack>
          </>
  );
};

