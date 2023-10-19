import { Flex, Heading } from "@chakra-ui/react"
import { StockTable } from "../components/Stock/StockTable"
import { useEffect, useState } from "react"
import { Pagination } from "../../../components/pagination/pagination"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import headersGen from "../../../api/headers"
import axios from "../../../api/axios"
import { toast } from "react-toastify"

export const StockView = () => {
    const user = useSelector((state) => state.user.value)
    const token = localStorage.getItem("token")
    const headers = headersGen(token)
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [reload, setReload] = useState(0)
    const [stock, setStock] = useState()
    const [warehouse, setWarehouse] = useState()
    const [category, setCategory] = useState()
    const [totalPage, setTotalPage] = useState([])
    const currentPage = Number(params.get("page")) || 1;
    const categoryId = params.get("categoryId") || "";
    const warehouseId = params.get("warehouseId") || "";
    const search = params.get("search") || "";

    const getStock = async () => {
        try {
            const response = await axios.get(`/stock?categoryId=${categoryId}&warehouseId=${warehouseId}&search=${search}&page=${currentPage}`, { headers })
            setStock(response.data.result);
            setTotalPage(response.data.totalpage)
        } catch (error) {
            console.log(error);
            toast.error("Failed to load stock!")
        }
    }
    const getCategory = async () => {
        try {
            const response = await axios.get("/category?limit=9999")
            setCategory(response.data.result);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load categories!")
        }
    }
    const getWarehouse = async () => {
        try {
            const response = await axios.get("/warehouse/?limit=9999999")
            setWarehouse(response.data.result);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load warehouse list!")
        }
    }
    const handleSelectCat = (id) => {
        navigate(`?search=${search}&warehouseId=${warehouseId}&categoryId=${id}&page=${currentPage}`);
    }
    const handleSelectWarehouse = (id) => {
        navigate(`?search=${search}&warehouseId=${id}&categoryId=${categoryId}&page=${currentPage}`);
    }
    const handleSearch = (q) => {
        navigate(`?search=${q}&warehouseId=${warehouseId}&categoryId=${categoryId}&page=${currentPage}`);
    }
    const triggerReload = () => {
        setReload(!reload)
    }
    useEffect(() => {
        getStock()
        getCategory()
        getWarehouse()
    }, [categoryId, warehouseId, search, totalPage, reload, currentPage])
    return (
        <Flex p="10px" justify="center">
            <Flex w="full" direction="column" gap={3}>
                <Heading fontSize="22px">Warehouse Stock</Heading>
                <StockTable 
                data={stock} 
                handleCat={handleSelectCat} 
                handleWarehouse={handleSelectWarehouse}
                handleSearch={handleSearch}
                category={category}
                warehouse={warehouse}
                reload={triggerReload}
                user={user}
                />
                <Pagination totalpage={totalPage} />
            </Flex>
        </Flex>
    )
}