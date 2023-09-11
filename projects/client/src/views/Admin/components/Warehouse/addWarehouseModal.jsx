import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { AddWarehouse } from './addWarehouse';
import axios from 'axios';



export const AddWarehouseModal = ({ isOpen, onClose, setReload, reload }) => {
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const getCity = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/location/city`,
        data
      );
      console.log(response);
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/location/province`,
        data
      );
      console.log(response);
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCity();
    getProvince();
  }, []); 
  useEffect(() => {
    setDataCities(cities);
    setDataProvince(province);
  }, [cities, province]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddWarehouse dataProvince={dataProvince} dataCities={dataCities} setReload={setReload} reload={reload} onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

