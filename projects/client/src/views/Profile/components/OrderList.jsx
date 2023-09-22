import { Flex } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { OrderCard } from "./OrderCard"


export const OrderList = () => {
    const [order, setOrder] = useState([])
    const token = localStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const getOrderList = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/userOrder", { headers })
            console.log(response.data.result);
            setOrder(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getOrderList()
    },[])
    return (
        <Flex w="full" direction="column" gap={5}>
            {order?.map((item) => (
                <Flex w="full" key={item.id} direction="column" >
                    <OrderCard data={item} />
                </Flex>
            ))}
        </Flex>
    )
}