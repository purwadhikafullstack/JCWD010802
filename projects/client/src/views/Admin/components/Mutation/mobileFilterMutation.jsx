import React, { useState } from 'react';
import {
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  HStack,
  Select,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

export const FilterMutation = ({
    
    filterStatus,
    onFilterStatus,
    dateFilter,
    sortDirection,
    onSortDirection,
    handleResetFilter,
    onFilterProduct,
    filterProduct ,
    handleDateFilter,
    product
}) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={'outline'}
        display={{ base: 'block', md: 'none' }} 
      >
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => setIsOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Options</DrawerHeader>
          <DrawerBody>
          <Stack  p={5} w={"100%"} gap={2}>
      <Select
            placeholder="Product"
            value={filterProduct}
            borderWidth={"2px"}
            borderColor={"gray.400"}
            onChange={(e) => {
              onFilterProduct(e.target.value);
            }}
          >
            <option value="">All Products</option>
            {product.map((productName) => (
              <option key={productName.id} value={productName.id}>
                {productName.name}
              </option>
            ))}
          </Select>
        <Select
          placeholder="Status"
          value={filterStatus}
          borderWidth={"2px"}
          borderColor={"gray.400"}
          onChange={(e) => onFilterStatus(e.target.value)}
          >
          <option value="">All</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="requested">Requested</option>
        </Select>
        <Select
  placeholder="Date Range"
  value={dateFilter}
  borderWidth="2px"
  borderColor="gray.400"
  onChange={(e) => {
    handleDateFilter(e.target.value);
  }}
>
  <option value="">All</option>
  <option value="today">Today</option>
  <option value="last7">Last 7 Days</option>
  <option value="last30">Last 30 Days</option>
</Select>
        <Select
          placeholder="Sort by Date"
          value={sortDirection}
          borderWidth={"2px"}
          borderColor={"gray.400"}
          onChange={(e) => onSortDirection(e.target.value)}
          >
          <option value="asc">Oldest</option>
          <option value="desc">Newest</option>
        </Select>
        <Button
          _hover={{}}
          mx={2}
          onClick={handleResetFilter}
          variant={"ghost"}
        >
          Clear Filter
        </Button>
      </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

