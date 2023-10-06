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
import formatIDR from '../../../../helpers/formatIDR';
import { useNavigate } from 'react-router-dom';
import { PaginationAddress } from '../pagination';

export const OrderList = ({ 
  order,
  totalpage,
  filterStatus,
  filterShipping,
  onFilterShipping,
  sortDirection,
  onFilterStatus,
  onSortDirection,
  currentPage,
  statusList }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Menunggu Pembayaran':
        return 'yellow';
      case 'Menunggu Konfirmasi Pembayaran':
        return 'yellow';
      case 'Diproses':
        return 'blue';
      case 'Dikirim':
        return 'green';
      case 'Pesanan Dikonfirmasi':
        return 'teal';
      case 'Dibatalkan':
        return 'red';
      default:
        return 'gray';
    }
  };
  
  const navigate = useNavigate();

  const handleRowClick = (orderId) => {
    navigate(`admin/detail-order/${orderId}`);
  };


  return (
    <>
     <Flex justifyContent={"flex-end"}>

    <HStack p={5} w={"40%"} gap={2}>
          <Select
            placeholder="Status"
            value={filterStatus}
            borderWidth={"2px"}
            borderColor={"gray.400"}
            onChange={(e) => onFilterStatus(e.target.value)}
            >
            <option value="">All Status</option>
            {statusList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.status}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Shipping Method"
            value={filterShipping}
            borderWidth={"2px"}
            borderColor={"gray.400"}
            onChange={(e) => onFilterShipping(e.target.value)}
          >
            <option value="">All</option>
            <option value="jne">JNE</option>
            <option value="tiki">TIKI</option>
            <option value="pos">POS INDONESIA</option>
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
        {order.length === 0 ? (
          <Center>
          <Heading>No Order</Heading>
        </Center>
      ) : (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Total Price</Th>
          <Th>Shipping Method</Th>
          <Th>Send From</Th>
          <Th>Created At</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {order.map((order) => (
          <Tr
            key={order.id}
            onClick={() => handleRowClick(order.id)} 
            style={{ cursor: 'pointer' }} 
          >
            <Td>{order.id}</Td>
            <Td>{formatIDR(order.totalPrice)}</Td>
            <Td>{convertToUppercase(order.shippingMethod)}</Td>
            <Td>{order.warehouse?.name}</Td>
            <Td>
              {new Date(order.createdAt).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </Td>
            <Td>
              <Badge
                colorScheme={getStatusBadgeColor(order.status.name)}
              >
                {order.status.name}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
      )}
        <PaginationAddress totalpage={totalpage} />

                </>
  );
};
