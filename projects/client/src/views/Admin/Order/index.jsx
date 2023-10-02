import axios from "axios"
import { useEffect, useState } from "react"
import { SuperOrderList } from "../components/Order/superOrderList"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { OrderList } from "../components/Order/orderList"
export const OrderView = () => {
const [superOrder, setSuperOrder] = useState([])
const [order, setOrder] = useState([])
const [filterStatus, setFilterStatus] = useState('');  
const [filterwarehouse, setFilterWarehouse] = useState('');  
const [filterShipping, setFilterShipping] = useState('');  
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
  const status = params.get("filterStatus") || '';
  const sortDir = params.get("sortDirection") || 'asc';
  const warehouseId = params.get("warehouseId") || '';
  const navigate = useNavigate();

    const getSuperOrder = async()=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/order/?page=${currentPage}&statuses=${status}&warehouseId=${warehouseId}&sortDir=${sortDir}&shipping=${shipping}`)
            setSuperOrder(response.data.result)
            setPageSuperOrders(response.data.totalpage); 
        } catch (error) {
            console.log(error);
        }
    }
    const getOrder = async()=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/order/warehouse/${id}?page=${currentPage}&statuses=${status}&warehouseId=${warehouseId}&sortDir=${sortDir}&shipping=${shipping}`)
            setOrder(response.data.result)
            setPageAllOrders(response.data.totalpage); 
        } catch (error) {
            console.log(error);
        }
    }
    const getWarehouse = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/warehouse/list`);
          setWarehouse(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    const getStatus = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/order/status`);
          setStatusList(response.data.result);
        } catch (error) {
          console.log(error);
        }
      };
      const handleFilterStatus = (status) => {
        setFilterStatus(status);
        navigate(`?filterStatus=${status}&sortDirection=${sortDir}&warehouseId=${warehouseId}&shipping=${shipping}`)
      };
      const handleFilterWarehouse = (warehouse) => {
        setFilterWarehouse(warehouse);
        navigate(`?filterStatus=${status}&sortDirection=${sortDir}&warehouseId=${warehouse}&shipping=${shipping}`)
      };
    
      const handleSortDirection = (direction) => {
        setSortDirection(direction);
        navigate(`?sortDirection=${direction}&filterStatus=${status}&warehouseId=${warehouseId}&shipping=${shipping}`)
      };
      const handleFilterShipping = (ship) => {
        setFilterShipping(ship);
        navigate(`?sortDirection=${sortDir}&filterStatus=${status}&warehouseId=${warehouseId}&shipping=${ship}`)
      };
    
    
    useEffect(()=>{
        getSuperOrder()
        getWarehouse()
        getStatus()
        getOrder()
    },[currentPage, status, sortDir, warehouseId,shipping]) 
    return(
        <>
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
        onFilterShipping={handleFilterShipping}
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
        currentPage={currentPage}
        warehouse={warehouse}
        statusList={statusList}
        shipping={shipping}/>
        )}
        </>
    )
}