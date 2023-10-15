import { Flex, Heading, Image } from "@chakra-ui/react";
import { VerifiedCard } from "./components/VerifiedCard";
import { Link } from "react-router-dom";

export const VerifiedView = () => {
  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh" bg="#edf3f8">
      <Flex h="100vh" w="50%" p="15px" display={{ base: "none", lg: "flex" }}>
        <Image
          src="https://jooinn.com/images1280_/man-holding-teacup-infront-of-laptop-on-top-of-table-inside-the-room-5.jpg"
          objectFit="cover"
          borderRadius="10px"
        />
      </Flex>
      <Flex
        h="100vh"
        w={{ base: "full", lg: "50%" }}
        direction="column"
        align="center"
        justifyContent={{ base: "center", lg: "flex-start" }}
        p="15px"
      >
        <Heading
          mt="10px"
          w={{ base: "unset", lg: "full" }}
          fontSize="20px"
          as={Link}
          to="/"
        >
          techtok.id
        </Heading>
        <VerifiedCard />
      </Flex>
    </Flex>
  );
};
