import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";

export const UserProfileModal = ({ user, profile, isOpen, onClose }) => {
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);
  const getCity = async (data) => {
    try {
      const response = await axios.get(`/location/city`, data);
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cities!")

    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(`/location/province`,data);
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load provinces!")

    }
  };
  useEffect(() => {
    getCity();
    getProvince();
  }, []); 

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
      <ModalOverlay />
      <ModalContent bg={"white"} color={"#2d3319"}>
        <ModalHeader color={"#2d3319"} fontWeight={"bold"}>
          User Profile
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user && (
            <Box>
              <Text fontSize="lg" color={"#2d3319"} fontWeight={"semibold"}>
                Name : {user.name}
              </Text>
              <Text fontSize="lg" color={"#2d3319"} fontWeight={"semibold"}>
                Email : {user.email}
              </Text>
              <Text fontSize="lg" color={"#2d3319"} fontWeight={"semibold"}>
                Address :
              </Text>
              <UnorderedList mt={2}>
                {profile?.map((item, index) => (
                  <ListItem key={index} color={"#2d3319"}>
                    <Text color={"#2d3319"}>
                      {item?.address?.address}, {item?.address?.nama_kota},{" "}
                      {item?.address?.nama_provinsi}
                    </Text>
                    {item.isPrimary && (
                      <Badge
                        colorScheme="green"
                        variant={"subtle"}
                        ml={1}
                        color={"green.400"}
                      >
                        Primary Addres
                      </Badge>
                    )}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="red">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
