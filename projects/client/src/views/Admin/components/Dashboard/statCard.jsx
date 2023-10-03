import React from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export const StatCard = ({ label, value }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg={"#517664"} color={"white"}>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </Box>
  );
};

