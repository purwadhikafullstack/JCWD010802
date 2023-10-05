import { Flex, Input, Select } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { OrderCard } from "./OrderCard"
import { PaginationProfile } from "./PaginationProfile"


export const OrderList = () => {
    const [order, setOrder] = useState([])
    const [reload, setReload] = useState(0)
    const [totalPage, setTotalPage] = useState([])
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("DESC")
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState()
    const [selectedStatus, setSelectedStatus] = useState("")
    const token = localStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const getOrderList = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/userOrder?sort=${sort}&page=${page}&search=${search}&statusId=${selectedStatus}`, 
            { headers }
            )
            setOrder(response.data.result)
            setTotalPage(response.data.totalpage)
        } catch (error) {
            console.log(error);
        }
    }
    const getStatus = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/userOrder/status")
            setStatus(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const triggerReload = () => {
        setReload(!reload)
    }
    const handleSort = (e) => {
        setSort(e)
    }
    const handleSearch = (e) => {
        setSearch(e)
    }
    const handleStatus = (e) => {
        setSelectedStatus(e)
    }
    useEffect(() => {
        getOrderList()
        getStatus()
    },[reload, sort, page, search, selectedStatus])
    return (
        <Flex w="full" direction="column" gap={5}>
            <Flex w="full" gap={{ base: 2, lg: 0}} justify="space-between" direction={{ base: "column", lg: "row"}}>
                <Flex gap={2}>
                    <Input borderColor="black" placeholder="Search Order" w="max-content" onChange={(e) => handleSearch(e.target.value)} />
                    <Select borderColor="black" placeholder="Status" w="max-content" onChange={(e) => handleStatus(e.target.value)}>
                        {status?.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Select>
                </Flex>
                <Flex>
                    <Select borderColor="black" placeholder="Sort" w="max-content" onChange={(e) => handleSort(e.target.value)}>
                        <option value="DESC">Latest</option>
                        <option value="ASC">Oldest</option>
                    </Select>
                </Flex>
            </Flex>
            {order?.map((item) => (
                <Flex w="full" key={item.id} direction="column" >
                    <OrderCard reload={triggerReload} data={item} />
                </Flex>
            ))}
            <PaginationProfile totalpage={totalPage} currentpage={page} setPage={setPage}/>
        </Flex>
    )
}