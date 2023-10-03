import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { StatCard } from '../components/Dashboard/statCard';

export const Dashboard = () => {
  const [data, setData] = useState({
    totalUser: 0,
    totalAdmin: 0,
    totalWarehouse: 0,
    totalProduct: 0,
    totalCategory: 0,
    categoriesWithProductCount: [],
  });

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pieData = data.categoriesWithProductCount.map((category) => ({
    name: category.name,
    value: category.productCount,
  }));

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#ffcc00',
  ];

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
         Dashboard
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        <GridItem>
          <StatCard label="Total User" value={data.totalUser} />
        </GridItem>
        <GridItem>
          <StatCard label="Total Admin" value={data.totalAdmin} />
        </GridItem>
        <GridItem>
          <StatCard label="Total Warehouse" value={data.totalWarehouse} />
        </GridItem>
        <GridItem>
          <StatCard label="Total Product" value={data.totalProduct} />
        </GridItem>
        <GridItem>
          <StatCard label="Total Category" value={data.totalCategory} />
        </GridItem>
        <Box gridColumn="span 3">
          <Box>
            {pieData.length > 0 ? (
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={pieData}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <Text>Loading...</Text>
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

    