import React from 'react';
import { Select } from '@chakra-ui/react';

export const UserSort = ({ handleSort }) => {
  const handleChange = (e) => {
    handleSort(e.target.value);
  };

  return (
    <Select
      placeholder="Sort"
      id="sortSelect"
      name="sortSelect"
      color="black"
      borderColor="2px solid black"
      onChange={handleChange}
      maxWidth="150px"
    >
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </Select>
  );
};

