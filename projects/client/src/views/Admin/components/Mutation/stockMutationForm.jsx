import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Select,
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import axios from '../../../../api/axios';

export const ManualStockMutationForm = ({ isOpen, onClose, warehouse, product, reload, setReload }) => {
  const initialValues = {
    fromWarehouseId: '',
    toWarehouseId: '',
    productId: '',
    quantity: '',
  };
  const data = useSelector((state) => state.user.value);
  const isAdminUser = data && data.roleId === 3;
  const isWarehouseUser = data && data.roleId === 2;

  let availableWarehouses = [];
  if (isAdminUser) {
    availableWarehouses = warehouse;
  } else if (isWarehouseUser) {
    const userWarehouseId = data.warehouseAdmin?.warehouseId;
    if (userWarehouseId) {
      availableWarehouses = warehouse.filter((wh) => wh.id === userWarehouseId);
    }
  }

  const validationSchema = Yup.object().shape({
    fromWarehouseId: Yup.string().required('From Warehouse ID is required'),
    toWarehouseId: Yup.string()
      .required('To Warehouse ID is required')
      .test('not-same', 'From and To Warehouses cannot be the same', function (value) {
        return value !== this.parent.fromWarehouseId;
      }),
    productId: Yup.string().required('Product ID is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer'),
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    setErrorMessage('');
    try {
      await axios.post('/mutation/manual', values);

      toast.success('Stock mutation request created successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      setReload(!reload)
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stock Mutation Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormControl>
                  <FormLabel>From Warehouse</FormLabel>
                  <Field as={Select} name="fromWarehouseId">
                    <option value="" disabled>
                      Select Warehouse
                    </option>
                    {warehouse.map((wh) => (
                      <option key={wh.id} value={wh.id}>
                        {wh.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="fromWarehouseId" component={Text} color="red" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>To Warehouse</FormLabel>
                  <Field as={Select} name="toWarehouseId">
                    <option value="" disabled>
                      Select Warehouse
                    </option>
                    {availableWarehouses.map((wh) => (
                      <option key={wh.id} value={wh.id}>
                        {wh.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="toWarehouseId" component={Text} color="red" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Product</FormLabel>
                  <Field as={Select} name="productId">
                    <option value="" disabled>
                      Select Product
                    </option>
                    {product.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="productId" component={Text} color="red" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Quantity</FormLabel>
                  <Field type="number" name="quantity" as={Input} />
                  <ErrorMessage name="quantity" component={Text} color="red" />
                </FormControl>

                {errorMessage && (
                  <Alert status="error" mt={4}>
                    <AlertIcon />
                    {errorMessage}
                  </Alert>
                )}

                <Flex justifyContent="flex-end" mt={4}>
                  <Button type="submit" colorScheme="green">
                    Create Request
                  </Button>
                  <Button
                    type="button"
                    colorScheme="gray"
                    ml={3}
                    onClick={onClose}
                  >
                    Cancel
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
