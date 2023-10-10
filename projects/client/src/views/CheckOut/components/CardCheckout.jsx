import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalChooseAddress } from "./modal/modalChooseAddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckoutList } from "./ListCheckout";
import { ConfirmCheckout } from "./confirmChekcout";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "../../../api/axios";

export const CardCheckout = () => {
  const token = localStorage.getItem("token");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [onOpenModalChooseAddress, setOnOpenModalChooseAddress] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState(null);
const cart =useSelector(state=>state.cart.value)
  const AllAddress = async () => {
    try {
      const response = await axios.get(`/address/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.result;
      setAddresses(data);
      const primary = data.find((item) => item.isPrimary);
      setPrimaryAddress(primary);
      setSelectedAddress(primary);
    } catch (error) {
      console.error(error);
    }
  };  

  const handleClick = (id) => {
    const selected = addresses.find((item) => item.id === id);
    setSelectedAddress(selected);
    setOnOpenModalChooseAddress(false);
    if (id !== 0) {
      toast.success("Shipping address change");
    }
  };

  useEffect(() => {
    AllAddress();
  }, []);

  useEffect(() => {
    if (primaryAddress) {
      setSelectedAddress(primaryAddress);
    }
  }, [primaryAddress]);

  return (
    <>
    {cart?.length === 0?(
      <Center flexDirection={"column"}>
      <Image
        src="https://img.freepik.com/free-vector/add-cart-concept-illustration_114360-1435.jpg?w=740&t=st=1695704262~exp=1695704862~hmac=3b04c76b1390720ab571e66d6ac6ed8b08c68314607cb6f7c70349c5a6bfecd4"
        boxSize={{ base: '100%', md: 'lg' }}
      />
      <Heading>Your cart is empty, Let's go shopping</Heading>
      <NavLink to={"/product"}>

      <Button mt={10} bg={"#517664"} color={"white"} _hover={{color:"#517664", bg:"#d6e5e3"}}>
            Shop Now!
          </Button>
      </NavLink>
    </Center>
    ):(

      <Flex p={{ base: "20px", lg: "50px" }} flexWrap="wrap" >
      <Flex direction="column" w={{ base: "100%", lg: "60%" }} mx={3} mb={3}>
        <Heading fontSize={{ base: "20px", lg: "30px" }}>Checkout</Heading>
        <Divider borderWidth={4} my={3} />
        <Text fontWeight="bold" fontSize={{ base: "15px", lg: "25px" }}>
          Shipping address:
        </Text>
        <Divider borderWidth={2} my={3} marginTop={5} />
        {selectedAddress === null && primaryAddress && (
          <Box
          key={primaryAddress.id}
            borderRadius="md"
            display="flex"
            flexDirection="row"
            borderRight="10px solid"
            borderRightColor="green.200"
          >
            <Box ml={4} flex="1">
              <Flex gap={2} alignItems="center">
                <Text fontSize="xl" fontWeight="bold">
                  {primaryAddress.user.name}
                </Text>
                <Badge variant="outline" fontSize="xs" colorScheme="green">
                  primary
                </Badge>
              </Flex>
              <Text fontSize="sm" fontWeight="light">
                {primaryAddress.user.email}
              </Text>
              <Text fontSize="md" fontWeight="semibold">
                {primaryAddress.address.address}
              </Text>
              <Text fontSize="md" fontWeight="semibold">
                {primaryAddress.address.nama_kota},{" "}
                {primaryAddress.address.nama_provinsi},{" "}
                {primaryAddress.address.kode_pos}
              </Text>
            </Box>
          </Box>
        )}
        {selectedAddress !== null &&
          addresses.map((item) => {
            if (item.id === selectedAddress.id) {
              return (
                <Box
                key={item.id}
                  borderRadius="md"
                  display="flex"
                  flexDirection="row"
                  borderRight="10px solid"
                  borderRightColor="green.200"
                  >
                  <Box ml={4} flex="1">
                    <Flex gap={2} alignItems="center">
                      <Text fontSize="xl" fontWeight="bold">
                        {item.user.name}
                      </Text>
                      {item.isPrimary ? (
                        <Badge
                        variant="outline"
                        fontSize="xs"
                        colorScheme="green"
                        >
                          primary
                        </Badge>
                      ) : null}
                    </Flex>
                    <Text fontSize="x-small">{item.user.email}</Text>
                    <Text fontSize="md" fontWeight="semibold">
                      {item.address.address}
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                      {item.address.nama_kota}, {item.address.nama_provinsi},{" "}
                      {item.address.kode_pos}
                    </Text>
                  </Box>
                </Box>
              );
            }
            return null;
          })}
        <Divider borderWidth={2} my={3} marginTop={5} />
        <Button
          colorScheme="linkedin"
          onClick={() => {
            setOnOpenModalChooseAddress(true);
          }}
          w="120px"
          >
          Other address
        </Button>
        <Divider borderWidth={2} my={3} marginTop={5} />
        <CheckoutList selectedAddress={selectedAddress} />
        <ModalChooseAddress
          onOpen={onOpenModalChooseAddress}
          onClose={() => setOnOpenModalChooseAddress(false)}
          handleClick={handleClick}
          selectedId={selectedAddress ? selectedAddress.id : 0}
          />
        <ToastContainer />
      </Flex>
      <ConfirmCheckout addressId={selectedAddress} />
    </Flex>
          )}
          </>
  )
};