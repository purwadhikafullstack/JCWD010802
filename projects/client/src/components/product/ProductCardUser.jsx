import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import formatIDR from "../../helpers/formatIDR";

export const ProductCardUser = ({ name, price, image, category, reload, setReload, onClick }) => {
  return (
    <Flex m={3} onClick={onClick}>
      <Box
        w="100px"
        bg="white"
        alignItems="center"
        p="10px"
        minW="180px"
        borderRadius="10px"
        shadow="md"
        key={name}
      >
        <Box>
          <Image
            src={`http://localhost:8000/productImg/${image}`}
            w="full"
            h="200px"
            objectFit="contain"
          />
        </Box>
        <Box>
            <Badge variant='outline' colorScheme='whatsapp' mb={2}>{category}</Badge>
          <Text fontSize="14px">{name}</Text>
          <Text fontSize="16px" fontWeight="bold">
            {formatIDR(price)}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
