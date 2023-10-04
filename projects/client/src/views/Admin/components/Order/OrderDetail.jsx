import { Flex, Heading } from "@chakra-ui/react"
import { ProductCardOrder } from "./ProductCard"
import { TableDetail } from "./TableDetail"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export const OrderDetailView = () => {
    const { id } = useParams()
    const [data, setData] = useState()

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/userOrder/${id}`)
            setData(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    },[])
    return (
        <Flex direction="column" gap={5} p="10px 20px">
            <Heading fontSize="24px">Order ID: {id}</Heading>
            <Flex w="full" direction="column">
                <Heading fontSize="20px">Purchased Item</Heading>
                <ProductCardOrder data={data} />
            </Flex>
            <TableDetail id={id} data={data}/>
        </Flex>
    )
}