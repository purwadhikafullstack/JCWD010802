import { Box, Container, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { ProductCard } from "../../../components/product/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PaginationAddress } from "../../../components/pagination/paginationAddress";
import { DrawerSorting } from "./Drawer/DrawerSort";

export const AllProduct = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const category = params.get("category") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const currentPage = Number(params.get("page")) || 1;
  const token = localStorage.getItem("token");
  const [page, setPage] = useState([]);
  const [product, setProduct] = useState([]);
  const [reload, setReload] = useState(false);
  
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product?search=${search}&sort=${sort}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      setProduct(response.data.result);
      setPage(response.data.totalpage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, [search, sort, category, minPrice, maxPrice, currentPage, reload]);

  return (
    <Box minH={"100vh"} bgColor={"#edf3f8"} w={"full"}>
      <Container maxW="container.lg" pt={"100px"}>
        <DrawerSorting />
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
        >
          {product.map((item, index) => (
            <GridItem key={index}>
              <ProductCard
                name={item.name}
                price={item.price}
                image={item.productImg}
                category={item.category.name}
                reload={reload}
                setReload={setReload}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
      <PaginationAddress totalpage={page} />
    </Box>
  );
};
