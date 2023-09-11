import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  Badge,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { InputField } from '../../../../components/input/InputField';
import { toast, ToastContainer } from 'react-toastify';


export const AddWarehouse = ({  dataCities, dataProvince,reload,setReload,onClose  }) => {
  const handleSubmit = async(data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("name",data.name)
      formData.append("address",data.address)
      formData.append("kota",data.kota)
      formData.append("provinsi",data.provinsi)
      formData.append("kode_pos",data.kode_pos)
      const response = await axios.post(
        `http://localhost:8000/api/warehouse`,
        formData
      );
      toast.success('Warehouse added successfully');
      onClose()
      setReload(!reload)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     <Formik
      initialValues={{
        name:"",
        address: "",
        kota: "",
        provinsi: "",
        kode_pos: "",
      }}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        onClose();
      }}>

     {(props) => (
       <Box as={Form}>
        <FormControl>
          <InputField
          label="Name"
          name="name"
          id="name"
          className="name"
          mb="10px"
          placeholder="Enter warehouse name"/>
        </FormControl>
        <FormControl>
        <InputField
          label="Addess"
          name="address"
          id="address"
          className="address"
          mb="10px"
          placeholder="Enter warehouse address"/>
        </FormControl>
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
                        {dataProvince?.map((province) => (
                          <option
                            key={province.province_id}
                            value={province.province_id}
                            >
                            {province.province}
                          </option>
                        ))}
                      </Field>
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
                    </FormControl>
                    <FormControl>
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
        <FormControl>
                    <FormLabel textColor={"black"}>Image</FormLabel>
                    <ErrorMessage
                      component="div"
                      name="file"
                      style={{ color: "red" }}
                    />
                    <Input
                      onChange={(e) => {
                        props.setFieldValue("file", e.target.files[0]);
                      }}
                      variant="flushed"
                      type="file"
                      name="file"
                      placeholder="Choose file"
                      mb={4}
                      bgColor={"white"}
                    />
                  </FormControl>
        
        <Stack direction="row" spacing="2" mt="3" justifyContent="flex-end">
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={() => props.handleSubmit()}>
            Add
          </Button>
        </Stack>
            </Box>
         )}
            </Formik>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};
