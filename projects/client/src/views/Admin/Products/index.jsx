import axios from "../../../api/axios";
import { Flex, Heading } from "@chakra-ui/react"
import { AddProductButton } from "../components/Products/addProductButton"
import { ProductList } from "../components/Products/listProduct"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { SearchProductAdmin } from "../components/Products/searchProductAdmin";
import { CategorySort } from "../components/Products/categorySort";
import { Pagination } from "../../../components/pagination/pagination";
import { useSelector } from "react-redux";
import { SortingProduct } from "../components/Products/SortingProduct";
import { toast } from "react-toastify";



export const AdminProducts = () => {
    const user = useSelector((state) => state.user.value)
    const location = useLocation();
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const sortCat = params.get("category") || ""
    const sort = params.get("sort") || ""
    const [category, setCategory] = useState()
    const [product, setProduct] = useState()
    const [reload, setReload] = useState(0)
    const [totalPage, setTotalPage] = useState([])
    const currentPage = Number(params.get("page")) || 1;

    const getProduct = async () => {
        try {
            const params = {
                page: currentPage,
                category: sortCat,
                search,
                sort,
                limit: 10
            }
            const response = await axios.get(`/product`, { params })
            setProduct(response.data.result);
            setTotalPage(response.data.totalpage)
        } catch (error) {
            console.log(error);
            toast.error("Failed to load products!")
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("/category?limit=9999")
            setCategory(response.data.result)
        } catch (error) {
            console.log(error);
            toast.error("Failed to load categories!")
        }
    }
    const triggerReload = () => {
        setReload(!reload)
    }
    const handleSearch = (result) => {
        navigate(`?search=${result.target.value}&category=${sortCat}&sort=${sort}`);
    }
    const handleSortCat = (selectedSort) => {
        if (selectedSort === sortCat) {
          navigate(`?search=${search}&sort=${sort}&category=`);
        } else {
          navigate(`?search=${search}&sort=${sort}&category=${selectedSort}`);
        }
    }
    const handleSort = (selectedSort) => {
        if (selectedSort === sort) {
            navigate(`?search=${search}&category=${sortCat}&sort=`);
        } else {
            navigate(`?search=${search}&category=${sortCat}&sort=${selectedSort}`);
        }
    } 
    
    useEffect(() => {
        getCategories()
        getProduct()
    },[reload, currentPage, search, sortCat, sort])
    return (
        <Flex direction="column" align="center">
            <Flex w="full" justify="flex-start" p="10px">
                <Heading fontSize="22px">Products</Heading>
            </Flex>
            <Flex align="center" gap={2} justifyContent={{base: "center", md: "space-between"}} w="full" p="10px">
                <Flex gap={2}>
                    <SearchProductAdmin search={search} handleSearch={handleSearch} />
                    <CategorySort category={category} handleSort={handleSortCat} />
                    <SortingProduct handleSort={handleSort} />
                </Flex>
                {user?.roleId === 3 ? <AddProductButton category={category} reload={triggerReload} /> : null}
            </Flex>
            <Flex mx="5" w="full">
                <ProductList reload={triggerReload}  product={product} category={category} />
            </Flex>
            <Pagination totalpage={totalPage}/>
        </Flex>
    )
}