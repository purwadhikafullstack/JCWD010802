import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import formatIDR from "../../helpers/formatIDR";

export const ProductCard = ({ name, price, image, category, onClick }) => {
  return (
    <Flex onClick={onClick}>
      <Box
        bg="white"
        alignItems="center"
        p="10px"
        minW={{ base: "140px", lg: "180px"}}
        borderRadius="10px"
        shadow="md"
        key={name}
      >
        <Box>
          <Image
            src={`http://localhost:8000/productImg/${image}`}
            w="full"
            h={{ base: "120px", lg: "200px"}}
            objectFit="contain"
          />
        </Box>
        <Box>
            <Badge variant='outline' colorScheme='whatsapp' mb={2}>{category}</Badge>
          <Text fontSize="14px">{name}</Text>
          <Text fontSize={{base: "14px", lg: "16px"}} fontWeight="bold">
            {formatIDR(price)}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
