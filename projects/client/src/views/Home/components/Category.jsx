import { Flex, Heading } from "@chakra-ui/react"
import { CategoryCard } from "./CategoryCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Category = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()

    const getCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/category?limit=7")
            setData(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const onClick = (id) => {
        navigate(`product?search=&sort=&category=${id}`)
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        getCategory()
    },[])
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Category</Heading>
            <Flex gap={3} mt="20px" pb="20px" overflowX="scroll" maxW="1400px">
                <CategoryCard data={data} onClick={onClick} />
            </Flex>
        </Flex>
    )
}