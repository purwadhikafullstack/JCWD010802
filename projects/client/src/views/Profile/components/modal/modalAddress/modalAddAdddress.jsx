import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputField } from "../../../../../components/input/InputField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddAddress = ({ dataCities, dataProvince, reload, setReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");
  
  const CreateSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    kota: Yup.string().required("City is required"),
    provinsi: Yup.string().required("Province is required"),
    kode_pos: Yup.string().required("Postal code is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/address/add`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Address added successfully');
      onClose();
      setReload(!reload)
    } catch (error) {
      toast.error('Error adding address');
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        address: "",
        kota: "",
        provinsi: "",
        kode_pos: "",
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        onClose();
      }}
    >
      {(props) => (
        <Box as={Form}>
          <Button mb={5} colorScheme="teal" size={"md"} onClick={onOpen}>
            Add address
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add address</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box as={Form}>
                  <FormControl>
                    <InputField
                      label="Address"
                      name="address"
                      id="address"
                      className="address"
                      mb="10px"
                      placeholder="Enter your address"
                    />
                    <FormControl>
                      <FormLabel textColor={"black"}>Province</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select province"
                        name="provinsi"
                        onChange={(e) => {
                          const selectedProvinceId = e.target.value;
                          props.setFieldValue("provinsi", selectedProvinceId); 
                          props.setFieldValue("kota", "");
                        }}
                        value={props.values.provinsi}
                      >
                        {dataProvince.map((province) => (
                          <option
                            key={province.province_id}
                            value={province.province_id}
                          >
                            {province.province}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="provinsi"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel textColor={"black"}>City</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select city"
                        name="kota"
                        onChange={(e) => {
                          const selectedCityId = e.target.value;
                          props.setFieldValue("kota", selectedCityId); 
                        }}
                        value={props.values.kota} 
                      >
                        {dataCities
                          .filter(
                            (city) => city.province_id === props.values.provinsi
                          ) 
                          .map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                              {city.city_name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="kota"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                    <InputField
                      label="Postal code "
                      type="number"
                      name="kode_pos"
                      id="kode_pos"
                      className="kode_pos"
                      mb="10px"
                      placeholder="Input your postal code"
                    />
                  </FormControl>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="green" onClick={props.handleSubmit}>
                  Accept
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </Box>
      )}
    </Formik>
  );
};
