import { Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ProductCard } from "../../../components/product/ProductCard"

export const NewProduct = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/product?limit=8")
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
                    <ProductCard 
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