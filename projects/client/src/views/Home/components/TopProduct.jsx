import { Flex, Heading } from "@chakra-ui/react"
import { ProductCardUser } from "../../../components/product/ProductCardUser"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const TopProduct = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/product?sort=za")
            setData(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const onClick = (id) => {
        navigate(`product/${id}`)
    }
    useEffect(() => {
        getData()
    },[])
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Top Selling Products</Heading>
            <Flex gap={3} mt="20px" overflowX="scroll" pb="20px" maxW="1400px">
                {data?.map((item) => (
                    <ProductCardUser 
                        name={item.name}
                        price={item.price}
                        image={item.productImg}
                        category={item.category.name}
                        onClick={() => onClick(item.id)}
                    />
                ))}
            </Flex>
        </Flex>
    )
}