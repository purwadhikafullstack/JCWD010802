import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddAddress } from "../../Profile/components/modal/modalAddress/modalAddAdddress";
import { Pagination } from "../../../components/pagination/pagination";
import { EditAddress } from "../../Profile/components/modal/modalAddress/modalEditAddress";
import { PrimaryAddress } from "../../Profile/components/modal/modalAddress/modalPrimaryAddress";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { SearchAddress } from "./searchAddress";

export const AddressCheckout = ({
  handleClick,
  address,
  selectedAddress,
  setSelectedAddress,
  reload,
  setReload,
  page,
}) => {
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [onOpenModalPrimary, setOnOpenModalPrimary] = useState(false);
  const [onOpenModalEdit, setOnOpenModalEdit] = useState(false);
  const [otherAddress, setOtherAddress] = useState({});
  const navigate = useNavigate();

  const getCity = async (data) => {
    try {
      const response = await axios.get(`/location/city`, data);
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cities!");
    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(`/location/province`, data);
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load provinces!");
    }
  };

  useEffect(() => {
    getCity();
    getProvince();
  }, []);
  useEffect(() => {
    setDataCities(cities);
    setDataProvince(province);
  }, [cities, province]);

  return (
    <Box>
      <VStack>
        <SearchAddress />
        <AddAddress
          dataCities={dataCities}
          dataProvince={dataProvince}
          reload={reload}
          setReload={setReload}
        />
      </VStack>
      {address.map((item, index) => (
        <Box
          bgColor={"whiteAlpha.700"}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          display="flex"
          w="full"
          mb={5}
          style={{
            borderRight:
              selectedAddress?.id === item.id ? "10px solid green" : "none",
          }}
        >
          <Flex width={"full"} direction={"column"}>
            <Box w="100%">
              {item.isPrimary ? (
                <Badge colorScheme="whatsapp" mb={3}>
                  Primary address
                </Badge>
              ) : null}
              <Heading fontSize="24px" mb={5}>
                {`${item.address.address}`}
              </Heading>
              <Text>{`${item.address.nama_kota}, ${item.address.nama_provinsi}`}</Text>
            </Box>
            <Box w="100%">
              <Flex
                justifyContent={"flex-start"}
                gap={3}
                alignItems={"center"}
                mt={"20px"}
              >
                {item.isPrimary ? null : (
                  <>
                    <Text
                      as={"button"}
                      fontWeight={"bold"}
                      size={"xs"}
                      onClick={() => {
                        setOnOpenModalPrimary(true);
                        setOtherAddress(item);
                      }}
                      _hover={{ color: "green.500" }}
                    >
                      Set primary
                    </Text>
                    <Divider
                      orientation="vertical"
                      h={5}
                      borderColor={"green"}
                      borderWidth={1}
                    />
                  </>
                )}
                {selectedAddress?.id === item.id ? null : (
                  <>
                    <Text
                      as={"button"}
                      fontWeight={"bold"}
                      size={"xs"}
                      onClick={() => handleClick(item.id)}
                      _hover={{ color: "green.500" }}
                    >
                      Set as address
                    </Text>
                    <Divider
                      orientation="vertical"
                      h={5}
                      borderColor={"green"}
                      borderWidth={1}
                    />
                  </>
                )}
                <Text
                  as={"button"}
                  fontWeight={"bold"}
                  size={"xs"}
                  onClick={() => {
                    setOnOpenModalEdit(true);
                    setOtherAddress(item);
                  }}
                  _hover={{ color: "green.500" }}
                >
                  Edit
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
      <Pagination totalpage={page} />
      <EditAddress
        onOpen={onOpenModalEdit}
        onClose={() => setOnOpenModalEdit(false)}
        id={otherAddress?.addressId}
        dataCities={dataCities}
        dataProvince={dataProvince}
        address={otherAddress?.address?.address}
        province={otherAddress?.address?.provinsi}
        city={otherAddress?.address?.kota}
        postal={otherAddress?.address?.kode_pos}
        reload={reload}
        setReload={setReload}
      />
      <PrimaryAddress
        onOpen={onOpenModalPrimary}
        id={otherAddress?.addressId}
        onClose={() => setOnOpenModalPrimary(false)}
        reload={reload}
        setReload={setReload}
      />
    </Box>
  );
};
