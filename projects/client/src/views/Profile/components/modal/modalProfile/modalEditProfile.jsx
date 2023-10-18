import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  ModalFooter,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputField } from "../../../../../components/input/InputField";
import axios from "../../../../../api/axios";
import headersGen from "../../../../../api/headers";
import { FiSettings } from "react-icons/fi";

export const ModalEditProfile = ({
  id,
  name,
  email,
  isOpen,
  onClose,
  reload,
}) => {
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
  const finalRef = React.useRef(null);
  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Image is required"),
  });

  const handleSubmit = async (data) => {
    try {
      await axios.patch(`/user/edit`, data, { headers });
      reload();
      onClose();
      toast.success("Profile updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Error to updating profile", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: name,
        email: email,
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        onClose();
      }}
      enableReinitialize
    >
      {(props) => (
        <>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit profile</ModalHeader>
              <ModalCloseButton />
              <Form>
                <ModalBody>
                  <Box as={Form}>
                    <FormControl>
                      <InputField
                        label="Name"
                        name="name"
                        id="name"
                        className="name"
                        type="text"
                        w={"full"}
                        mb="10px"
                        placeholder="Enter your name here"
                        variant="flushed"
                      />
                      <InputField
                        label="Email"
                        name="email"
                        id="email"
                        className="email"
                        type="email"
                        w={"full"}
                        mb="10px"
                        placeholder="Enter your email here"
                        variant="flushed"
                      />
                    </FormControl>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">
                    Accept
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          </Modal>
          <ToastContainer />
        </>
      )}
    </Formik>
  );
};
