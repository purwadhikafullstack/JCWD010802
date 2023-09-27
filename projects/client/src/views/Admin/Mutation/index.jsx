import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IncomingRequests } from "../components/Mutation/mutationRequest";
import { AllRequests } from "../components/Mutation/allRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { ManualStockMutationForm } from '../components/Mutation/stockMutationForm';

export const MutationView = () => {
  const [filterStatus, setFilterStatus] = useState('');  const [sortDirection, setSortDirection] = useState('asc')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warehouse, setWarehouse] = useState([]);
  const [product, setProduct] = useState([]);
  const [request, setRequest] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
  const data = useSelector((state) => state.user.value);
  const id = localStorage.getItem("warehouseId");
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = Number(params.get("page")) || 1;
  const status = params.get("filterStatus") || '';
  const sortDir = params.get("sortDirection") || 'asc';
  const navigate = useNavigate()

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/warehouse/list`);
      console.log(response);
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product?limit=99999999`);
      setProduct(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const incomingRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/mutation/incoming/${id}`); 
      console.log(response);
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const allRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/mutation/${id}?page=${currentPage}&status=${status}&sortDir=${sortDir}`); 
      console.log(response);
      setAllRequest(response.data.result);
      setPage(response.data.totalpage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    navigate(`?filterStatus=${status}&sortDirection=${sortDir}`)
  };

  const handleSortDirection = (direction) => {
    setSortDirection(direction);
    navigate(`?sortDirection=${direction}&filterStatus=${status}`)

  };

  useEffect(() => {
    getWarehouse();
    getProduct();
    incomingRequest();
    allRequests();
  }, [reload, currentPage,status,sortDir]);

  return (
    <Box p={3}>
      <Flex justifyContent={"flex-end"} p={5}>
        <Button bg="#517664" mb={3} color={"white"} _hover={{bg:"#2d3319"}} onClick={handleOpenModal}>
          Request Product
        </Button>
        </Flex>
      <IncomingRequests data={request} reload={reload} setReload={setReload} />
      <AllRequests
        data={allRequest}
        totalpage={page}
        filterStatus={filterStatus}
        sortDirection={sortDirection}
        onFilterStatus={handleFilterStatus}
        onSortDirection={handleSortDirection}
      />
      <ManualStockMutationForm isOpen={isModalOpen} onClose={handleCloseModal} warehouse={warehouse} product={product} reload={reload} setReload={setReload} />
    </Box>
  );
};
