import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { StatCard } from '../components/Dashboard/statCard';
import axios from '../../../api/axios';

export const Dashboard = () => {
  const [data, setData] = useState({
    totalUser: 0,
    totalAdmin: 0,
    totalWarehouse: 0,
    totalProduct: 0,
    totalCategory: 0,
    totalVerifiedUsers: 0,
    totalUnverifiedUsers: 0,
    categoriesWithProductCount: [],
  });

  const getData = async () => {
    try {
      const response = await axios.get('/dashboard');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#ffcc00",
    "#FF6B6B",
    "#A3A1FB",
    "#64C4ED",
    "#FFD166",
    "#FF8C42",
    "#A0E7E5",
    "#3A506B",
    "#EF476F",
    "#F7F7FF",
    "#21313E",
    "#FDE74C",
    "#DBEDF3",
    "#F6F6F6",
    "#023047",
  ];

  const categoryPieData = data.categoriesWithProductCount.map((category) => ({
    name: category.name,
    value: category.productCount,
  }));

  const userVerificationPieData = [
    { name: 'Verified Users', value: data.totalVerifiedUsers },
    { name: 'Unverified Users', value: data.totalUnverifiedUsers },
  ];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const unit = "Products";

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
      </SimpleGrid>
      <HStack>
        <Box>
          {userVerificationPieData.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={userVerificationPieData}
                outerRadius={80}
                fill="#8884d8"
                label
                labelLine={false}
              >
                {userVerificationPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
        <Box>
          {categoryPieData.length > 0 ? (
            <PieChart width={450} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={categoryPieData}
                outerRadius={80}
                fill="#FFBB28"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {categoryPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Products']} />
              <Legend />
            </PieChart>
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
};
