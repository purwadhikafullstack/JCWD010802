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
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  TableContainer
} from '@chakra-ui/react';
import convertToUppercase from '../../../../helpers/upperCase';
import formatIDR from '../../../../helpers/formatIDR';
import { useNavigate } from 'react-router-dom';
import { PaginationAddress } from '../pagination';
import { BsSearch } from 'react-icons/bs';
import { FilterComponent } from './mobileFilterOrder';

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
  handleResetFilter,
  statusList, dateFilter,onFilterDate,search,handleSearch}) => {
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
    navigate(`detail-order/${orderId}`);
  };


  return (
    <>
     <FilterComponent
          search={search}
          handleSearch={handleSearch}
          filterShipping={filterShipping}
          onFilterShipping={onFilterShipping}
          filterStatus={filterStatus}
          onFilterStatus={onFilterStatus}
          dateFilter={dateFilter}
          onFilterDate={onFilterDate}
          sortDirection={sortDirection}
          onSortDirection={onSortDirection}
          handleResetFilter={handleResetFilter}
          statusList={statusList}
        />
     <Flex justifyContent={"flex-end"} display={{ base: 'none', md: "block" }}>
     <Flex p={5} w={"50%"}>
    <InputGroup>
            <Input
                variant="outline"
                placeholder="Search Invoice Number"
                _placeholder={{ color: "black" }}
                value={search}
                type={"search"}
                color={"black"}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}                
                borderColor={"2px solid black"}
                w="80%"
                />
            <InputLeftElement>
                <Icon as={BsSearch} color={"gray.500"} />
            </InputLeftElement>
        </InputGroup>
                </Flex>
    <Flex p={5} w={"100%"} gap={2} justifyContent={"flex-end"}>
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
                {item.name}
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
  placeholder="Date Range"
  value={dateFilter}
  borderWidth="2px"
  borderColor="gray.400"
  onChange={(e) => {
    onFilterDate(e.target.value);
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
          mx={2}
          _hover={{}}
          onClick={handleResetFilter}
          variant={"ghost"}
        >
          Clear Filter
        </Button>
        </Flex>
        </Flex>
        {order.length === 0 ? (
          <Center>
          <Heading>No Order</Heading>
        </Center>
      ) : (
        <TableContainer>

    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Invoice</Th>
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
            <Td>{order.invoice}</Td>
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
        </TableContainer>
      )}
        <PaginationAddress totalpage={totalpage} />

                </>
  );
};
