import { Box, Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/pagination/pagination";
import { DrawerSorting } from "./Drawer/DrawerSort";
import { ProductCardUser } from "../../../components/product/ProductCardUser";

export const AllProduct = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const category = params.get("category") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const currentPage = Number(params.get("page")) || 1;
  const [page, setPage] = useState([]);
  const [product, setProduct] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()
  
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product?search=${search}&sort=${sort}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}`);
      setProduct(response.data.result);
      setPage(response.data.totalpage);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (id) => {
    navigate(`/product/${id}`)
  }
  useEffect(() => {
    getProduct();
  }, [search, sort, category, minPrice, maxPrice, currentPage, reload]);

  useEffect(() => {
    if (product?.length > 0) {
      setIsLoaded(true)
    }
  }, [product])

  return (
    <Box minH={"100vh"} bgColor={"#edf3f8"} w={"full"} pb="20px">
      <Container maxW="container.lg" pt={"100px"}>
        <DrawerSorting />
        <Flex wrap="wrap" justifyContent="center"
        gap={3}>
          {product.map((item, index) => (
            <Flex key={index}>
              <ProductCardUser
                onClick={() => handleClick(item.id)}
                name={item.name}
                price={item.price}
                image={item.productImg}
                category={item.category.name}
                reload={reload}
                setReload={setReload}
                isLoaded={isLoaded}
              />
            </Flex>
          ))}
        </Flex>
      </Container>
      <Pagination totalpage={page} />
    </Box>
  );
};
