import { Flex, Heading, Image } from "@chakra-ui/react";
import { VerifiedCard } from "./components/VerifiedCard";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { NotFound } from "../../pages/Error";

export const VerifiedView = () => {
  const { token } = useParams()
  const [success, setSuccess] = useState(true)
  const getToken = async () => {
    try {
      const response = await axios.get(`/auth/${token}`)
      setSuccess(true)
    } catch (error) {
      console.log(error);
      setSuccess(false)
      toast.error(error?.data?.message, {
        position: "top-right",
        autoClose: 3000
      })
    }
  }

  useEffect(() => {
    getToken()
  },[])

  return success ? (
    <Flex justifyContent="center" alignItems="center" minH="100vh" bg="#edf3f8">
      <ToastContainer />
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
  ) : (<NotFound />)
};
