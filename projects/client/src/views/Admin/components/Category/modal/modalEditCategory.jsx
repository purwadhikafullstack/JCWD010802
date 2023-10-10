import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  ModalFooter,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputField } from "../../../../../components/input/InputField";
import axios from "../../../../../api/axios";

export const ModalEditCategory = ({ id, name, image, isOpen, onClose, reload, setReload }) => {
  const finalRef = React.useRef(null);
  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    file: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const { name, file } = data;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const response = await axios.patch(`/category/edit/${id}`, formData,
        { "Content-Type": "multipart/form-data", }
      );
      setReload(!reload);
      onClose();
      toast.success('Category updated successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error updating category', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: name,
        file: image,
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
              <ModalHeader>Category detail</ModalHeader>
              <ModalCloseButton />
              <Form>
                <ModalBody>
                  <Box as={Form}>
                    <InputField
                      label="Name"
                      name="name"
                      id="name"
                      className="name"
                      type="text"
                      w={"full"}
                      mb="10px"
                      placeholder="Enter your category here"
                      variant="flushed"
                    />
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
                        bgColor={"transparent"}
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </>
      )}
    </Formik>
  );
};
