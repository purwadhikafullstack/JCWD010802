import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { AddWarehouse } from './addWarehouse';
import axios from '../../../../api/axios';
import { toast } from 'react-toastify';



export const AddWarehouseModal = ({ isOpen, onClose, setReload, reload }) => {
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const getCity = async (data) => {
    try {
      const response = await axios.get(`/location/city`, data);
      setCities(response.data.city.rajaongkir.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cities!")

    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(`/location/province`, data);
      setProvince(response.data.province.rajaongkir.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load provinces!")

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

