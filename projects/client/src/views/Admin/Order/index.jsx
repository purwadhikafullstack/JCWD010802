import { useEffect, useState } from "react"
import { SuperOrderList } from "../components/Order/superOrderList"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { OrderList } from "../components/Order/orderList"
import { Heading } from "@chakra-ui/react"
import axios from "../../../api/axios"
export const OrderView = () => {
const [superOrder, setSuperOrder] = useState([])
const [order, setOrder] = useState([])
const [filterStatus, setFilterStatus] = useState('');  
const [searchs, setSearch] = useState('');  
const [filterwarehouse, setFilterWarehouse] = useState('');  
const [filterShipping, setFilterShipping] = useState(''); 
const [dateFilters, setDateFilter] = useState('all') 
const [sortDirection, setSortDirection] = useState('asc')
const [warehouse, setWarehouse] = useState([]);
const [statusList, setStatusList] = useState([]);
const data = useSelector((state) => state.user.value);
const id = localStorage.getItem("warehouseId");
const [pageAllOrders, setPageAllOrders] = useState([]); 
const [pageSuperOrders, setPageSuperOrders] = useState([]); 
const location = useLocation();
const params = new URLSearchParams(location.search);
const shipping = params.get("shipping") || '';
const currentPage = Number(params.get("page")) || 1;
const search = params.get("search") || "";
  const status = params.get("filterStatus") || '';
  const sortDir = params.get("sortDirection") || 'asc';
  const warehouseId = params.get("warehouseId") || '';
  const dateFilter = params.get("dateFilter")||""
  const navigate = useNavigate();
  const initialFilterStatus = '';
  const initialFilterWarehouse = '';
  const initialFilterShipping = '';
  const initialDateFilter = '';
  const initialSortDirection = 'asc';
  const initialSearch =''
  
    const getSuperOrder = async()=>{
        try {
            const response = await axios.get(`/userOrder/admin/?page=${currentPage}&statuses=${status}&warehouseId=${warehouseId}&sortDir=${sortDir}&shipping=${shipping}&dateFilter=${dateFilter}&search=${search}`)
            setSuperOrder(response.data.result)
            setPageSuperOrders(response.data.totalpage); 
        } catch (error) {
            console.log(error);
        }
    }
    const getOrder = async()=>{
        try {
            const response = await axios.get(`/userOrder/warehouse/${id}?page=${currentPage}&statuses=${status}&warehouseId=${warehouseId}&sortDir=${sortDir}&shipping=${shipping}&dateFilter=${dateFilter}&search=${search}`)
            setOrder(response.data.result)
            setPageAllOrders(response.data.totalpage); 
        } catch (error) {
            console.log(error);
        }
    }
    const getWarehouse = async () => {
        try {
          const response = await axios.get(`/warehouse/list`);
          setWarehouse(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    const getStatus = async () => {
        try {
          const response = await axios.get(`/userOrder/status`);
          setStatusList(response.data.result);
        } catch (error) {
          console.log(error);
        }
      };
      const updateQueryParams = (updates) => {
        const queryParams = {
          filterStatus,
          sortDirection,
          warehouseId,
          shipping,
          dateFilter,
          search, 
          ...updates
          
        };
      
        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`?${queryString}`);
      };
      
      const handleFilterStatus = (status) => {
        setFilterStatus(status);
        updateQueryParams({ filterStatus: status });
      };
      
      const handleFilterWarehouse = (warehouse) => {
        setFilterWarehouse(warehouse);
        updateQueryParams({ warehouseId: warehouse });
      };
      
      const handleSortDirection = (direction) => {
        setSortDirection(direction);
        updateQueryParams({ sortDirection: direction });
      };
      
      const handleFilterShipping = (ship) => {
        setFilterShipping(ship);
        updateQueryParams({ shipping: ship });
      };
      
      const handleFilterDate = (filter) => {
        setDateFilter(filter);
        updateQueryParams({ dateFilter: filter });
      };
      
      const handleSearch = (searchText) => {
        setSearch(searchText);
        updateQueryParams({ search: searchText });
      };
      
      const handleResetFilter = () => {
        setFilterStatus(initialFilterStatus);
        setFilterWarehouse(initialFilterWarehouse);
        setFilterShipping(initialFilterShipping);
        setDateFilter(initialDateFilter);
        setSortDirection(initialSortDirection);
        setSearch(""); 
      
        updateQueryParams({
          filterStatus: initialFilterStatus,
          warehouseId: initialFilterWarehouse,
          shipping: initialFilterShipping,
          dateFilter: initialDateFilter,
          sortDirection: initialSortDirection,
          search: initialSearch, 
        });
      };
      
      
    
    useEffect(()=>{
        getSuperOrder()
        getWarehouse()
        getStatus()
        getOrder()
    },[currentPage, status, sortDir, warehouseId,shipping,dateFilter,search]) 
    return(
        <>
        <Heading py={5} ml={5}>
          Order List
        </Heading>
        {data.roleId === 2?(
          <OrderList 
          order={order} 
          totalpage={pageAllOrders} 
        filterStatus={filterStatus}
        sortDirection={sortDirection}
        onFilterStatus={handleFilterStatus}
        onSortDirection={handleSortDirection}
        currentPage={currentPage}
        statusList={statusList}
        shipping={shipping}
        filterShipping={filterShipping}
        dateFilter={dateFilters}
        onFilterDate={handleFilterDate}
        onFilterShipping={handleFilterShipping}
        handleResetFilter={handleResetFilter}
        search={searchs}
        handleSearch={handleSearch}
        />
        ):(
          <SuperOrderList 
          order={superOrder} 
          totalpage={pageSuperOrders} 
        filterStatus={filterStatus}
        filterWarehouse={filterwarehouse}
        filterShipping={filterShipping}
        sortDirection={sortDirection}
        onFilterStatus={handleFilterStatus}
        onSortDirection={handleSortDirection}
        onFilterShipping={handleFilterShipping}
        onFilterWarehouse={handleFilterWarehouse}
        dateFilter={dateFilters}
        onFilterDate={handleFilterDate}
        currentPage={currentPage}
        warehouse={warehouse}
        statusList={statusList}
        shipping={shipping}
        handleResetFilter={handleResetFilter}
        search={searchs}
        handleSearch={handleSearch}
        />
        )}
        </>
    )
}