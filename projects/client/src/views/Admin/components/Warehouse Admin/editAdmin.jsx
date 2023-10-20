import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormLabel, Input, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Flex } from '@chakra-ui/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from '../../../../api/axios';
export const AdminEditForm = ({ admin, onUpdateAdmin}) => {
  const initialValues = {
    name: admin.user.name ||'',
    email: admin.user.email||'',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);

      const response = await axios.patch(`/admin/${admin.user.id}`, {
        name:values.name,
        email:values.email
      });
      closeModal();

      setSubmitting(false);
      if (response.status === 200) {
        onUpdateAdmin({
          ...admin,
          user: {
            ...admin.user,
            name: values.name,
            email: values.email,
          },
        });
    } }
    catch (error) {
      console.error(error); 
      setSubmitting(false);
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <>
      <Button onClick={openModal}  
      mb={[2, 2, 0]}
            color="#2d3319"
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            mr={[0, 0, 2]} >Edit</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {(formik) => (
                <Form>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Field name="name" as={Input} />
                    <ErrorMessage name="name" component={Text} color="red.500" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Field name="email" as={Input} />
                    <ErrorMessage name="email" component={Text} color="red.500" />
                  </FormControl>
                  <Flex justifyContent={"flex-end"} gap={3}>

                  <Button
                    mt={4}
                    colorScheme="red"
                    onClick={closeModal}
                    >
                    Cancel
                  </Button>
                  <Button
                    mt={4}
                    colorScheme="green"
                    isLoading={formik.isSubmitting}
                    type="submit"
                    >
                    Save
                  </Button>
                    </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

