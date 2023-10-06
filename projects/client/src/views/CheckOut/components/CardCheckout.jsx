import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModalChooseAddress } from "./modal/modalChooseAddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckoutList } from "./ListCheckout";
import { ConfirmCheckout } from "./confirmChekcout";

export const CardCheckout = () => {
  const token = localStorage.getItem("token");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [onOpenModalChooseAddress, setOnOpenModalChooseAddress] = useState(
    false
  );
  const [primaryAddress, setPrimaryAddress] = useState(null);

  const AllAddress = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/address/`, {
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
    <Flex p={{ base: "40px", lg: "100px" }}>

    <Flex direction="column" w={"60%"} >
      <Heading fontSize={{ base: "20px", lg: "30px" }}>Checkout</Heading>
      <Divider borderWidth={4} my={3} />
      <Text fontWeight={"bold"} fontSize={{ base: "15px", lg: "25px" }}>
        Shipping address :
      </Text>
      <Divider borderWidth={2} my={3} marginTop={5} />
      {selectedAddress === null && primaryAddress && (
        <Box
          key={primaryAddress.id}
          borderRadius="md"
          display="flex"
          flexDirection="row"
          borderRight={"10px solid"}
          borderRightColor={"green.200"}
        >
          <Box ml={4} flex="1">
            <Flex gap={2} alignItems={"center"}>
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
                borderRight={"10px solid"}
                borderRightColor={"green.200"}
              >
                <Box ml={4} flex="1">
                  <Flex gap={2} alignItems={"center"}>
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
        w={"120px"}
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
      <ToastContainer/>
    </Flex>
    <ConfirmCheckout addressId={selectedAddress}/>
        </Flex>
  );
};
