import {
    Box,
    Container,
    Heading,
    Spinner,
    Grid,
    Image,
    Text,
    Center,
    Flex,
    Stack,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { PaginationAddress } from "../Admin/components/pagination";
import formatIDR from "../../helpers/formatIDR";
import { RemoveButton } from "./components/removeWishlist";
import axios from "../../api/axios";
import { toast } from "react-toastify";
  
  export const WishlistView = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const currentPage = Number(params.get("page")) || 1;
    const [wishlistItems, setWishlistItems] = useState([]);
    const [page, setPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload,setReload] = useState(0)
    const token = localStorage.getItem("token");
  
    const navigate = useNavigate();
  
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `/cart/wishlist?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { result, totalpage } = response.data;
        setWishlistItems(result);
        setPage(totalpage);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Failed to load wishlist!")
      }
    };
  
    useEffect(() => {
      fetchWishlist();
    }, [currentPage,reload]);
  
    return (
      <Box minH={"100vh"} bgColor={"#edf3f8"} w={"full"} pb="20px">
        <Container maxW="container.lg" pt={"100px"}>
          <Heading as="h1" mb={4}>
            Wishlist
          </Heading>
          {loading ? (
            <Spinner />
          ) : (
            <>
            {wishlistItems.length === 0 ?(
                <Center>

                <Heading>
                    No item
                </Heading>
                </Center>
            ):(
                
                <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)", 
                  md: "repeat(2, 1fr)", 
                  lg: "repeat(3, 1fr)", 
                }}
                gap={4}
                >
              {wishlistItems.map((item) => (
                  <Flex
                  bg={"white"}
                  direction={"column"}
                alignItems={"center"}
                key={item.id}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  cursor="pointer"
                  p={4}
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                  >
                  <Image
                    src={`${process.env.REACT_APP_BASE_URL}/productImg/${item.product.productImg}`}
                    w={"180px"}
                    h={"180px"}
                    borderRadius={"10px"}
                    objectFit="cover"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    
                    />
                  <Stack alignItems={"center"}                   onClick={() => navigate(`/product/${item.product.id}`)}
>
                  <Text fontSize="lg">{item.product.name}</Text>
                  <Text fontSize="md" fontWeight="bold">
                    {formatIDR(item.product.price)}
                  </Text>
              </Stack>
                  <RemoveButton
  productId={item.product.id}
  reload={reload}
  setReload={setReload}
  
/>
                </Flex>
              ))}
            </Grid>
        )}
              </>
          )}
          </Container>
          <PaginationAddress totalpage={page} />
      </Box>
    );
  };
  