import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  Flex,
  HStack,
} from '@chakra-ui/react';
import convertToUppercase from '../../../../helpers/upperCase';
import { PaginationAddress } from '../pagination';

export const SuperRequests = ({
  data,
  totalpage,
  filterStatus,
  sortDirection,
  onFilterStatus,
  onSortDirection,
  currentPage,
  product, 
  onFilterProduct,
  filterProduct 
}) => {
  const statusStyles = {
    accepted: { color: 'green' },
    rejected: { color: 'red' },
    requested: { color: 'orange' },
  };

  
    return (
    <Box p={4}>
      <Heading fontSize="xl" mb={4}>
        Request History
      </Heading>
      <Flex justifyContent={"flex-end"}>
        <HStack p={5} w={"40%"} gap={2}>
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
            placeholder="Sort by Date"
            value={sortDirection}
            borderWidth={"2px"}
            borderColor={"gray.400"}
            onChange={(e) => onSortDirection(e.target.value)}
          >
            <option value="asc">Oldest</option>
            <option value="desc">Newest</option>
          </Select>
        </HStack>
      </Flex>
      {data.length === 0 ? (
        <Center>
          <Heading>No request</Heading>
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          {data.map((request) => (
            <Tr key={request.id}>
              <Td>{request.stock?.product?.name}</Td>
              <Td>{request.quantity}</Td>
              <Td>{request.from_name}</Td>
              <Td>{request.to_name}</Td>
              <Td>
                <Badge
                  colorScheme={statusStyles[request.status].color}
                >
                  {convertToUppercase(request.status)}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Table>
      )}
      <PaginationAddress totalpage={totalpage} />
    </Box>
  );
};
