import { Badge, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import formatIDR from "../../helpers/formatIDR";

export const ProductCardUser = ({ name, price, image, category, reload, setReload, onClick, isLoaded }) => {
  return (
    <Skeleton isLoaded={isLoaded}>
      <Flex onClick={onClick}>
        <Box
          bg="white"
          alignItems="center"
          p="10px"
          maxW={{ base: "140px", lg: "180px"}}
          borderRadius="10px"
          shadow="md"
          key={name}
          >
          <Box>
            <Image
              src={`${process.env.REACT_APP_BASE_URL}/productImg/${image}`}
              w="full"
              h={{ base: "120px", lg: "200px"}}
              objectFit="contain"
              />
          </Box>
          <Box>
              <Badge variant='outline' colorScheme='whatsapp' mb={2}>{category}</Badge>
            <Text fontSize="14px" maxW="160px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">{name}</Text>
            <Text fontSize={{base: "14px", lg: "16px"}} fontWeight="bold">
              {formatIDR(price)}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Skeleton>
  );
};
