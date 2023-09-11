import { Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { StockList } from "./stockList"


export const DetailStockWarehouse = () => {
    const { id } = useParams()
    const [stock, setStock] = useState()
    const [reload, setReload] = useState(0)

    const triggerReload = () => {
        setReload(!reload)
    }

    const getStock = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/stock/${id}`)
            console.log(response.data.result);
            setStock(response.data.result)
            triggerReload()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStock()
    },[])
    return (
        <Flex w="full" direction="column" p="20px">
            <Heading fontSize="22px">Product Stock</Heading>
            <Flex w="full" direction="column" gap={2} mt="20px">
                <StockList data={stock} triggerReload={triggerReload} />
            </Flex>
        </Flex>
    )
}