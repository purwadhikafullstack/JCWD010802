import axios from "../../../../api/axios"
import formatIDR from "../../../../helpers/formatIDR"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { AddToCart } from "../addToCart"
import { AddToCartMobile } from "../AddToChartMobile"
import { toast } from "react-toastify"


export const DetailCard = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState([])
    const [stock, setStock] = useState([])
    const profile = useSelector((state) => state.user.value)

    const getDetail = async () => {
        try {
            const response = await axios.get(`/product/${id}`)
            setDetail(response.data.result)
        } catch (error) {
            console.log(error);
            toast.error("Failed to load product detail!")
        }
    }
    const getStock = async () => {
        try {
            const response = await axios.get(`/stock/product/${id}`)
            setStock(response.data.result)
        } catch (error) {
            console.log(error);
            toast.error("Failed to load resources!")
        }
    }

    const getStockColor = () => {
        if (stock < 5) {
          return 'red'; 
        } else if (stock < 10) {
          return 'orange'; 
        } else {
          return 'green'; 
        }
    };
    
    const stockColor = getStockColor();
    
    useEffect(() => {
        getDetail()
        getStock()
    },[])

    return (
        <Flex minH="100vh" mb={3} p="120px 30px" justify="center" gap={10}
        direction={{ base: "column", lg: "row"}}>
            <Flex borderRadius="10px" shadow={{ base: "none", lg: "md"}} w={{ base: "full", lg: "300px"}} h={{ base: "inherit", lg: "300px"}} p={1} justify="center">
                <Image src={`${process.env.REACT_APP_BASE_URL}/productImg/${detail.productImg}`}
                 objectFit="cover"/>
            </Flex>
            <Flex direction="column" maxW={{ base: "full", lg: "25%"}} gap={5} color="black">
                <Flex direction={{ base: "column-reverse", lg: "column"}} gap={2}>
                    <Flex gap={1} display={{ base: "flex", lg: "none"}}>
                        <Text>Stock: </Text>
                        <Text fontWeight={"bold"} color={stockColor}> {stock}</Text>
                    </Flex>
                    <Heading fontSize="22px">{detail?.name}</Heading>
                    <Heading fontSize="25px">{formatIDR(detail?.price)}</Heading>
                </Flex>
                <Divider borderWidth={1} />
                <Box>
                    <Flex gap={1}>
                        <Text color="gray.500">Condition:</Text>
                        <Text>New</Text>
                    </Flex>
                    <Flex gap={1}>
                        <Text color="gray.500">Min Purchase:</Text>
                        <Text>1</Text>
                    </Flex>
                    <Flex gap={1}>
                        <Text color="gray.500">Category:</Text>
                        <Text as={Link} to={`/product?search=&sort=&category=${detail?.category?.id}`} fontWeight="bold" color="green">{detail?.category?.name}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Text>Description:</Text>
                    <Text mt="5px">{detail?.description}</Text>
                </Box>
            </Flex>
            {profile.roleId===2 || profile.roleId===3 ? null :
            <>
            <Flex display={{ base: "none", lg: "flex"}}>
                <AddToCart detail={detail} stock={stock} />
            </Flex>
            <Flex ml="-30px" display={{ base: "flex", lg: "none"}}>
                <AddToCartMobile detail={detail} stock={stock} />
            </Flex>
            </>
            }
        </Flex>
    )
}