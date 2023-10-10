import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { AddAddress } from "./modal/modalAddress/modalAddAdddress";
import { EditAddress } from "./modal/modalAddress/modalEditAddress";
import { DeleteAddress } from "./modal/modalAddress/modalDelete";
import { Sort } from "./modal/sortBy/sortBy";
import { PrimaryAddress } from "./modal/modalAddress/modalPrimaryAddress";
import { BsSearch } from "react-icons/bs";
import { PaginationProfile } from "./PaginationProfile";
import axios from "../../../api/axios";
import headersGen from "../../../api/headers";

export const AddressCard = () => {
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
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
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("DESC");
  const itemsPerPage = 5;

  const AllAdrress = async () => {
    try {
      const response = await axios.get(
        `/address?search=${search}&sort=${sort}&page=${currentPage}`,
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
      const response = await axios.get(`/location/city`, data);
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(`/location/province`, data);
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (result) => {
    setSearch(result);
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
      <Flex justifyContent={"space-between"} gap={3}>
        <InputGroup width={"60%"}>
          <Input
            variant="outline"
            placeholder="Search"
            _placeholder={{ color: "black" }}
            defaultValue={search}
            type={"search"}
            color={"black"}
            onChange={(e) => handleSearch(e.target.value)}
            borderColor={"2px solid black"}
          />
          <InputLeftElement>
            <Icon as={BsSearch} color={"gray.500"} />
          </InputLeftElement>
        </InputGroup>
        <Flex gap={3}>
          <AddAddress
            dataCities={dataCities}
            dataProvince={dataProvince}
            reload={reload}
            setReload={setReload}
          />
          <Sort sort={sort} setSort={setSort} />
        </Flex>
      </Flex>
      {address?.map((item, index) => (
        <Box
          bgColor={"whiteAlpha.700"}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          display="flex"
          w="full"
          mb={5}
        >
          <Flex width={"full"}>
            <Box w="50%">
              {item?.isPrimary ? (
                <Badge colorScheme="whatsapp" mb={3}>
                  Primary address
                </Badge>
              ) : null}
              <Heading fontSize="24px" mb={5}>
                {`${item?.address?.address}`}
              </Heading>
              <Text>{`${item?.address?.nama_kota}, ${item?.address?.nama_provinsi}`}</Text>
            </Box>
            <Box w="50%">
              <Flex
                direction={{ base: "column", lg: "row" }}
                gap={1}
                justifyContent={"flex-end"}
                align={{ base: "flex-end" }}
              >
                {item.isPrimary ? null : (
                  <Button
                    mb={5}
                    colorScheme="whatsapp"
                    size={"xs"}
                    onClick={() => {
                      setOnOpenModalPrimary(true);
                      setSelectedAddress(item);
                    }}
                  >
                    Set primary
                  </Button>
                )}
                <Button
                  mb={5}
                  colorScheme="blue"
                  size={"xs"}
                  onClick={() => {
                    setOnOpenModalEdit(true);
                    setSelectedAddress(item);
                  }}
                >
                  Edit
                </Button>
                {item.isPrimary ? null : (
                  <DeleteAddress
                    id={item.id}
                    reload={reload}
                    setReload={setReload}
                  />
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
      <PaginationProfile
        totalpage={page}
        currentpage={currentPage}
        setPage={setCurrentPage}
      />
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
