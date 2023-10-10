import {
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddToCart } from "../addToCart";
import { useSelector } from "react-redux";
import formatIDR from "../../../../helpers/formatIDR";
import axios from "../../../../api/axios";

export const DetailCard = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [stock, setStock] = useState([]);
  const [wish, setWish] = useState(false);
  const profile = useSelector(state=>state.user.value)
  const getDetail = async () => {
    try {
      const response = await axios.get(`/product/${id}`);
      setDetail(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getStock = async () => {
    try {
      const response = await axios.get(`/stock/product/${id}`);
      setStock(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
    getStock();
  }, []);

  return (
    <Flex
      minH={"100vh"}
      mb={3}
      pt={"70px"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        w={{ base: "100%", md: "50%" }}
        justifyContent={{ base: "center" }}
        m={{ base: "20px", md: "40px" }}
      >
        <Flex>
          <Image
            src={`http://localhost:8000/productImg/${detail.productImg}`}
            borderRadius={"10px"}
            shadow={"md"}
            w={"500px"}
            h={"500px"}
            objectFit={"cover"}
          />
        </Flex>
      </Flex>

      <Flex
        direction={{base:"column", lg:"row"}}
        w={{ base: "100%", md: "50%" }} 
        pt={{ base: "20px", md: "60px" }} 
        // pl={{ base: "20px", md: "0" }} 
      >

        <Stack spacing={4}  pl={{ base: "20px", md: "0" }} >
          <Heading fontSize={"5xl"}>{detail.name}</Heading>
          <Text color={"gray.500"} fontSize={"xl"}>
            Description :
          </Text>
          <Text color={"black"} fontSize={"lg"}>
            {detail.description}
          </Text>
          <Text color={"gray.500"} fontSize={"xl"}>
            Weight :
          </Text>
          <Text color={"black"} fontSize={"lg"}>
            {detail.weight} Kg
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Flex alignItems="center">
              <Text color={"gray.500"} fontSize={"xl"}>
                Price :
              </Text>
              <Text fontWeight={600} fontSize={"xl"} p={2}>
                {formatIDR(detail.price)}
              </Text>
            </Flex>
          </Stack>
        </Stack>
        {profile.roleId===2 ||profile.roleId===3?(
          null
          ):(
            <AddToCart detail={detail} stock={stock}/>
            
        )}
      </Flex>
    </Flex>
  );
};
