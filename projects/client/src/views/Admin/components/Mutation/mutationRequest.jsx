import React, { useEffect, useState } from 'react';
import { Box, Text, Center, Spinner, Table, Thead, Tbody, Tr, Th, Td, Heading, HStack } from '@chakra-ui/react';
import axios from "axios"
import { useSelector } from 'react-redux';
import convertToUppercase from '../../../../helpers/upperCase';
import { Accept } from './acceptButton';
import { Reject } from './rejectButton';

export const IncomingRequests = ({data,reload,setReload}) => 
{

    return(

        <Box p={4}>
      <Heading   mb={4}>
        Incoming Request
      </Heading>
    {data.length === 0 ?(
        <Center>
        <Heading>
            No incoming request
        </Heading>
        </Center>
    ):(

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>From</Th>
              <Th>Stock in Warehouse</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((request) => (
              <Tr key={request.id}>
                <Td>{request.stock.product.name}</Td>
                <Td>{request.quantity}</Td>
                <Td>{request.to_name}</Td>
                <Td>{request.stock.quantity}</Td>
                <Td>
                    <HStack gap={2}>
                <Accept requestId={request.id} reload={reload} setReload={setReload}/>
                <Reject requestId={request.id} reload={reload} setReload={setReload}/>
                    </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
    )}
    </Box>
)
};

