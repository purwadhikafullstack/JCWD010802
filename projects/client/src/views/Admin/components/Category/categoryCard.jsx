import {
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ButtonOptionCategory } from "./butttonEditDeleteCategory";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { SortCategory } from "./sort/sortCategory";
import { AddCategory } from "./modal/modalAddCategory";
import { Pagination } from "../../../../components/pagination/pagination";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";

export const CategoryCard = () => {
  const [category, setCategory] = useState();
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const currentPage = Number(params.get("page")) || 1;
  const [page, setPage] = useState([]);

  const getCategory = async () => {
    try {
      const CATEGORY_URL = `/category?limit=5`;
      const params = {
        search,
        sort,
        page: currentPage,
      };
      const response = await axios.get(CATEGORY_URL, { params });
      setCategory(response.data.result);
      setPage(response.data.totalpage);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load caregories!")

    }
  };
  const handleSearch = (result) => {
    navigate(`?search=${result.target.value}`);
  };
  useEffect(() => {
    getCategory();
  }, [reload, search, sort, currentPage]);
  return (
    <Flex flexDirection="column" py={5} gap={3} px={5}>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={3}>
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
          <SortCategory />
        </Flex>
        <AddCategory reload={reload} setReload={setReload} />
      </Flex>

      <VStack spacing={4} width={{ base: "100%", md: "50%" }}>
        {category?.map((item, index) => (
          <Card
            key={item.id}
            p={4}
            width={["100%", "100%", "100%", "100%"]}
            shadow="md"
            borderWidth="1px"
            mx={"auto"}
            position="relative"
            display="flex"
            flexDirection="column"
            bgColor={"white"}
          >
            <Flex justifyContent={"flex-end"}>
              <ButtonOptionCategory
                id={item.id}
                name={item.name}
                image={item.categoryImg}
                reload={reload}
                setReload={setReload}
              />
            </Flex>
            <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
              <Image
                objectFit="cover"
                src={`${process.env.REACT_APP_BASE_URL}/categoryImg/${item.categoryImg}`}
                shadow={"lg"}
                alt="#"
                boxSize="100px"
              />
              <Box ml={4}>
                <Heading as="h2" size="md">
                  {item.name}
                </Heading>
                <Text>Total product : {item.totalProduct}</Text>
              </Box>
            </Flex>
          </Card>
        ))}
      </VStack>
      <Pagination totalpage={page} />
    </Flex>
  );
};
