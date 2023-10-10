import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setCost,setShip } from "../../../redux/costSlice";
import formatIDR from "../../../helpers/formatIDR";
import axios from "../../../api/axios";

export const ShippingMethod = ({ selectedAddress, totalWeight }) => {
  const [warehouse, setWarehouse] = useState();
  const [selectedCourier, setSelectedCourier] = useState("");
  const [serviceCourier, setServiceCourier] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [courierSelected, setCourierSelected] = useState(false);
  const dispatch = useDispatch();

  const WarehouseOrigin = useCallback(async () => {
    try {
      const response = await axios.get(
        `/ship?lat=${selectedAddress?.address.lat || 0}&lng=${selectedAddress?.address.lng || 0}`
      );
      setWarehouse(response.data.origin);
    } catch (error) {
      console.log(error);
    }
  }, [selectedAddress?.address.lat, selectedAddress?.address.lng]);

  useEffect(() => {
    WarehouseOrigin();
  }, [WarehouseOrigin, selectedAddress]);

  const Cost = useCallback(async () => {
    try {
      const response = await axios.post(`/location`, {
        origin: warehouse,
        destination: selectedAddress?.address?.kota,
        weight: totalWeight,
        service: selectedCourier,
      });
      // console.log(response.data.price.rajaongkir);
      setServiceCourier(response.data.price.rajaongkir.results[0].costs);
    } catch (error) {
      console.log(error);
    }
  }, [selectedAddress?.address?.kota, totalWeight, warehouse, selectedCourier]);

  useEffect(() => {
    if (selectedCourier) {
      Cost();
    }
  }, [Cost, selectedCourier]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    if (e.target.value) {
      const selectedServiceObject = e.target.value;
      if (selectedServiceObject) {
        const costValue = selectedServiceObject;
        dispatch(setCost(costValue));
      } else {
        dispatch(setCost(0));
      }
    } else {
      dispatch(setCost(0));
    }
  };

  const handleCourierChange = (e) => {
    setSelectedCourier(e.target.value);
    setSelectedService("");
    dispatch(setCost(0));
    dispatch(setShip(e.target.value));
    setCourierSelected(true);
  };

  const handleAddressChange = () => {
    setSelectedCourier("");
    setSelectedService("");
    dispatch(setCost(0));
    dispatch(setShip(""));
    setCourierSelected(false);
  };

  useEffect(() => {
    handleAddressChange();
  }, [selectedAddress]);

  return (
    <Box>
      <Text fontWeight={"bold"} fontSize={{ base: "15px", lg: "25px" }}>Choose courier : </Text>
      <Flex gap={3} mt={3}>
      <Select
        placeholder="Select courier"
        name="courier"
        value={selectedCourier}
        onChange={handleCourierChange}
        variant='filled'
        maxW={"40%"}
      >
        <option value="jne">JNE</option>
        <option value="tiki">TIKI</option>
        <option value="pos">POS Indonesia</option>
      </Select>
      <Select
        placeholder="Select service"
        name="service"
        value={selectedService}
        onChange={handleServiceChange}
        mb={3}
        disabled={!selectedCourier} 
      >
        {serviceCourier?.map((item) => (
          <option key={item.service} value={item.cost[0].value}>
            <Box p={2} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">{item.service},</Text>
              {" "}
              <Text>Cost: {formatIDR(item.cost[0].value)},</Text>
              {" "}
              <Text>Estimated time: {item.cost[0].etd} day</Text>
            </Box>
          </option>
        ))}
      </Select>
        </Flex>
    </Box>
  );
};
