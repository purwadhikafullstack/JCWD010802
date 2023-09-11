import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Select,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  warehouse: Yup.string().required('Warehouse is required'),
});

export const AddAdmin = ({ isOpen, onClose, setReload,reload}) => {
    const [warehouses, setWarehouse] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    warehouse: '',
  };

  const handleSubmit = async(values) => {
    try {
        const response = await axios.post(
          "http://localhost:8000/api/admin",
          {
            name: values.name,
            email: values.email,
            password: values.password,
            warehouse:values.warehouse
          }
        );
        if (response.status === 200) {
            toast.success('successfully added new warehouse admin', {
              position: 'top-right',
              autoClose: 3000, 
            });
          }
          setReload(!reload)
      } catch (error) {
        console.log(error);
      }
    };
  
  const getWarehouse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/warehouse`);
      setWarehouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  return (
    <>
    <ToastContainer/>
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Warehouse Admin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="Your name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="Your email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} id="password" type="password" placeholder="Password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="warehouse">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.warehouse && form.touched.warehouse}>
                    <FormLabel htmlFor="warehouse">Warehouse</FormLabel>
                    <Select {...field} id="warehouse" placeholder="Select a warehouse">
                    {warehouses.map((item) => (
                      <option key={item.id} value={item.id}>
                          {item.name}
                      </option>
                    ))}
                    </Select>
                    <FormErrorMessage>{form.errors.warehouse}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex justifyContent="flex-end" gap={2}>
                <Button  onClick={onClose} mt={4} bg={"red.500"} color={"white"} _hover={{ bg: "red.700" }}>
                    Cancel
                </Button>
              <Button type="submit" mt={4} bg="#517664" color="white" _hover={{ bg: "#2d3319" }}>
                + Add Admin
              </Button>
              </Flex>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};

