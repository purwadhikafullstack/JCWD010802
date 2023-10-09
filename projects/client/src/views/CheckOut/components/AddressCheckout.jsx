import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AddAddress } from "../../Profile/components/modal/modalAddress/modalAddAdddress";
import { Pagination } from "../../../components/pagination/pagination";
import { EditAddress } from "../../Profile/components/modal/modalAddress/modalEditAddress";
import { PrimaryAddress } from "../../Profile/components/modal/modalAddress/modalPrimaryAddress";
import axios from "../../../api/axios";
import headersGen from "../../../api/headers";

export const AddressCheckout = ({ handleClick, selectedId }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const currentPage = Number(params.get("page")) || 1;
  const token = localStorage.getItem("token");
  const headers = headersGen(token)
  const [address, setAddress] = useState([]);
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [onOpenModalPrimary, setOnOpenModalPrimary] = useState(false);
  const [onOpenModalEdit, setOnOpenModalEdit] = useState(false);
  const [reload, setReload] = useState(0);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const navigate = useNavigate();

  const AllAdrress = async () => {
    try {
      const response = await axios.get(`/address?search=${search}&sort=${sort}&page=${currentPage}&limit=3`,
        { headers }
      );
      setAddress(response.data.result);
      setPage(response.data.totalpage);
    } catch (error) {
      console.log(error);
    }
  };
  const getCity = async (data) => {
    try {
      const response = await axios.get(
        `/location/city`,
        data
      );
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(
        `/location/province`,
        data
      );
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (result) => {
    navigate(`?search=${result.target.value}`);
  };
  useEffect(() => {
    AllAdrress();
    getCity();
    getProvince();
  }, [search, sort, currentPage, reload]);
  useEffect(() => {
    setDataCities(cities);
    setDataProvince(province);
  }, [cities, province]);

  return (
    <Box>
      <VStack>
        <InputGroup>
          <Input
            variant="outline"
            placeholder="Search"
            _placeholder={{ color: "black" }}
            defaultValue={search}
            type={"search"}
            color={"black"}
            onChange={handleSearch}
            borderColor={"2px solid black"}
          />
          <InputLeftElement>
            <Icon as={BsSearch} color={"gray.500"} />
          </InputLeftElement>
        </InputGroup>
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
            borderRight: selectedId === item.id ? "10px solid green" : "none",
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
                Address {startIndex + index + 1}
              </Heading>
              <Text>{`${item.address.address}, ${item.address.nama_kota}, ${item.address.nama_provinsi}`}</Text>
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
                        setSelectedAddress(item);
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
                {selectedId === item.id ? null : (
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
                    setSelectedAddress(item);
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
        id={selectedAddress?.addressId}
        dataCities={dataCities}
        dataProvince={dataProvince}
        address={selectedAddress?.address?.address}
        province={selectedAddress?.address?.provinsi}
        city={selectedAddress?.address?.kota}
        postal={selectedAddress?.address?.kode_pos}
        reload={reload}
        setReload={setReload}
      />
      <PrimaryAddress
        onOpen={onOpenModalPrimary}
        id={selectedAddress.addressId}
        onClose={() => setOnOpenModalPrimary(false)}
        reload={reload}
        setReload={setReload}
      />
    </Box>
  );
};
