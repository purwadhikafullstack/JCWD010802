import { Flex } from "@chakra-ui/react"
import { AddProductButton } from "../components/Products/addProductButton"
import { ProductList } from "../components/Products/listProduct"
import { useEffect, useState } from "react"
import axios from 'axios';
import { PaginationAddress } from "../../../components/pagination/paginationAddress";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchProductAdmin } from "../components/Products/searchProductAdmin";
import { CategorySort } from "../components/Products/categorySort";



export const AdminProducts = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const sort = params.get("category") || ""
    const [category, setCategory] = useState()
    const [product, setProduct] = useState()
    const [reload, setReload] = useState(0)
    const [totalPage, setTotalPage] = useState([])
    const currentPage = Number(params.get("page")) || 1;

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product?page=${currentPage}&category=${sort}&search=${search}&limit=10`)
            setProduct(response.data.result);
            setTotalPage(response.data.totalpage)
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/category")
            setCategory(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const triggerReload = () => {
        setReload(!reload)
    }
    const handleSearch = (result) => {
        navigate(`?search=${result.target.value}`);
    }
    const handleSort = (selectedSort) => {
        if (selectedSort === sort) {
          navigate(`?search=${search}&category=`);
        } else {
          navigate(`?search=${search}&categoty=${selectedSort}`);
        }
    }
    
    useEffect(() => {
        getCategories()
        getProduct()
    },[reload, currentPage, search, sort])
    return (
        <Flex direction="column" align="center">
            <Flex align="center" justifyContent={{base: "center", md: "space-between"}} w="full" p="10px">
                <SearchProductAdmin search={search} handleSearch={handleSearch} />
                {/* <CategorySort category={category} handleSort={handleSort} /> */}
                <AddProductButton category={category} reload={triggerReload} />
            </Flex>
            <Flex mx="5">
                <ProductList reload={triggerReload}  product={product} category={category} />
            </Flex>
            <PaginationAddress  totalpage={totalPage}/>
        </Flex>
    )
}