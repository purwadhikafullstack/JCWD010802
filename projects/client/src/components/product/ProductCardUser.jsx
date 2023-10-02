import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import formatIDR from "../../helpers/formatIDR";

export const ProductCardUser = ({ name, price, image, category, reload, setReload, onClick }) => {
  return (
    <Flex m={3} onClick={onClick}>
      <Box
        // w="100px"
        bg="white"
        alignItems="center"
        p="10px"
        minW="150px"
        borderRadius="10px"
        shadow="md"
        key={name}
        h="300px"
      >
        <Box>
          <Image
            src={`http://localhost:8000/productImg/${image}`}
            w="180px"
            h="180px"
            objectFit="cover"
            mb={2}
          />
        </Box>
        <Box>
            <Badge variant='outline' colorScheme='whatsapp' mb={2}>{category}</Badge>
          <Text fontSize="14px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="150px">{name}</Text>
          <Text fontSize="16px" fontWeight="bold">
            {formatIDR(price)}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
