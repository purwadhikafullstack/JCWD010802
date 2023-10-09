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
import { EditWarehouse } from './editWarehouse';
import axios from '../../../../api/axios';

export const EditWarehouseModal = ({ data, isOpen, onClose, provinces, city, setReload, reload }) => {
  const finalRef = React.useRef(null);
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
    }
  };
  const getProvince = async (data) => {
    try {
      const response = await axios.get(`/location/province`, data);
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
    <Modal isOpen={isOpen} onClose={onClose}finalFocusRef={finalRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditWarehouse data={data}  dataCities={dataCities}
        dataProvince={dataProvince}  provinces={provinces} city={city} setReload={setReload} reload={reload} onClose={onClose}/>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

