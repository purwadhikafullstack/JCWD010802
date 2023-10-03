import { Button, Center, Heading, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const ErrorPageView = () => {
  return (
    <>
      <Center pt={25} minH={"100vh"} flexDirection={"column"}>
        <Image src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?w=1060&t=st=1696227634~exp=1696228234~hmac=385fd039816dffa28665da364fbb5e7023d05364ecc38688251db857c23dc850" w={"650px"} h={"500px"}/>
        <Heading color={"#517664"}>This page is outside of the universe</Heading>
        <NavLink to={"/"}>
          <Button mt={10} bg={"#517664"} color={"white"} _hover={{color:"#517664", bg:"#d6e5e3"}}>
            GO BACK HOME
          </Button>
        </NavLink>
        <Text mt={10}>
          Or{" "}
          <NavLink to={"/register"}  style={{ color: "green", textDecoration: "underline" }}>
            register
          </NavLink>{" "}
          on our site to access more features
        </Text>
      </Center>
    </>
  );
};
