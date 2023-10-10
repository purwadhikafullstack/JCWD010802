import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IncomingRequests } from "../components/Mutation/mutationRequest";
import { AllRequests } from "../components/Mutation/allRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { ManualStockMutationForm } from '../components/Mutation/stockMutationForm';
import { SuperRequests } from '../components/Mutation/superRequest';
import axios from '../../../api/axios';

export const MutationView = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [dateFilters, setDateFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warehouse, setWarehouse] = useState([]);
  const [product, setProduct] = useState([]);
  const [request, setRequest] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
  const [superRequest, setSuperRequest] = useState([]);
  const data = useSelector((state) => state.user.value);
  const id = localStorage.getItem("warehouseId");
  const [reload, setReload] = useState(0);
  const [pageAllRequests, setPageAllRequests] = useState([]);
  const [pageSuperRequests, setPageSuperRequests] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = Number(params.get("page")) || 1;
  const status = params.get("filterStatus") || '';
  const sortDir = params.get("sortDirection") || 'asc';
  const productName = params.get("productName") || '';
  const dateFilter = params.get("dateFilter")||""

  const navigate = useNavigate();

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`/warehouse/list`);
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetFilter = () => {
    setDateFilter("")
    setFilterProduct("")
    setFilterStatus("")
    setSortDirection("asc")
    navigate('?');
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`/product?limit=99999999`);
      setProduct(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const incomingRequest = async () => {
    try {
      const response = await axios.get(`/mutation/incoming/${id}`);
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const allRequests = async () => {
    try {
      const response = await axios.get(`/mutation/${id}?page=${currentPage}&status=${status}&sortDir=${sortDir}&productName=${productName}&dateFilter=${dateFilter}`);
      setAllRequest(response.data.result);
      setPageAllRequests(response.data.totalpage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const superRequests = async () => {
    try {
      const response = await axios.get(`/mutation/super/?page=${currentPage}&status=${status}&sortDir=${sortDir}&productName=${productName}&dateFilter=${dateFilter}`);
      setSuperRequest(response.data.result);
      setPageSuperRequests(response.data.totalpage);
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
    navigate(`?filterStatus=${status}&sortDirection=${sortDir}&productName=${productName}&dateFilter=${dateFilter}`);
  };

  const handleFilterProduct = (product) => {
    setFilterProduct(product);
    navigate(`?filterStatus=${status}&sortDirection=${sortDir}&productName=${product}&dateFilter=${dateFilter}`);
  };

  const handleSortDirection = (direction) => {
    setSortDirection(direction);
    navigate(`?sortDirection=${direction}&filterStatus=${status}&productName=${productName}&dateFilter=${dateFilter}`);
  };

  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    navigate(`?dateFilter=${filter}&filterStatus=${status}&sortDirection=${sortDir}&productName=${productName}`);
  };

  useEffect(() => {
    getWarehouse();
    getProduct();
    incomingRequest();
    allRequests();
    superRequests();
  }, [reload, currentPage, status, sortDir, productName, dateFilter]);
  return (
    <Box p={3}>
      <Flex justifyContent={"flex-end"} p={5}>
        <Button bg="#517664" mb={3} color={"white"} _hover={{bg:"#2d3319"}} onClick={handleOpenModal}>
          Request Product
        </Button>
      </Flex>
      {data.roleId === 2 ? (
        <>
        <Tabs variant='enclosed'>
  <TabList>
    <Tab>Incoming Request</Tab>
    <Tab>Request History</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <IncomingRequests data={request} reload={reload} setReload={setReload} />
    </TabPanel>
    <TabPanel>
    <AllRequests
            data={allRequest}
            totalpage={pageAllRequests} 
            filterStatus={filterStatus}
            sortDirection={sortDirection}
            filterProduct={filterProduct}
            onFilterStatus={handleFilterStatus}
            onSortDirection={handleSortDirection}
            onFilterProduct={handleFilterProduct}
            currentPage={currentPage}
            product={product}
            handleResetFilter={handleResetFilter}
            dateFilter={dateFilters}
            handleDateFilter={handleDateFilter}
          />
    </TabPanel>
  </TabPanels>
</Tabs>
        </>
      ) : (
        <SuperRequests
          data={superRequest}
          totalpage={pageSuperRequests} 
          filterStatus={filterStatus}
          filterProduct={filterProduct}
          sortDirection={sortDirection}
          onFilterStatus={handleFilterStatus}
          onSortDirection={handleSortDirection}
          onFilterProduct={handleFilterProduct}
          currentPage={currentPage}
          product={product}
          handleResetFilter={handleResetFilter}
          dateFilter={dateFilters}
          handleDateFilter={handleDateFilter}
        />
      )}
      <ManualStockMutationForm isOpen={isModalOpen} onClose={handleCloseModal} warehouse={warehouse} product={product} reload={reload} setReload={setReload} />
    </Box>
  );
};
