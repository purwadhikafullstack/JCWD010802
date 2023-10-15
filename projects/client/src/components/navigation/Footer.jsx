import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { BiPhone } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Flex justify="center" bg="#9fd8cb">
      <Flex
        mb={{ base: "120px", lg: "0" }}
        p={{ base: "20px", lg: "40px" }}
        justifyContent={{ base: "flex-start", lg: "space-between"}}
        direction={{ base: "column", md: "row" }}
        bg="#9fd8cb"
        w={{ base: "full", lg: "1200px" }}
        gap={{ base: 5, md: 10 }}
      >
        <Box>
          <Heading fontSize="2xl">Warehouse</Heading>
          <HStack mt="10px">
            <BiPhone />
            <Text>022 12345</Text>
          </HStack>
          <HStack mt="5px">
            <ImLocation />
            <Text>Burangrang Street</Text>
          </HStack>
        </Box>
        <Flex direction="column" mt={{ base: "0px", md: "0" }}>
          <Heading fontSize="2xl">Links</Heading>
          <Text mt="10px" as={Link} to="/">
            Home
          </Text>
          <Text mt="5px" as={Link} to="/product">
            Products
          </Text>
          <Text mt="5px" as={Link} to="/about">
            About
          </Text>
          <Text mt="5px" as={Link} to="/contact">
            Contact
          </Text>
        </Flex>
        <Box mt={{ base: "0px", md: "0" }}>
          <Heading fontSize="2xl">Social Media</Heading>
          <HStack spacing={3} mt="10px">
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
          </HStack>
        </Box>
        <Box mt={{ base: "0px", md: "0" }}>
          <Heading fontSize="2xl">News Letter</Heading>
          <Text mt="10px">Subscribe to Our News Letter</Text>
          <HStack mt="5px">
            <Input placeholder="Enter your email" />
            <Button>Submit</Button>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};
