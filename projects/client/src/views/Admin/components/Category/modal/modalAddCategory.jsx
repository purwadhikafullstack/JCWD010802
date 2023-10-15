import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { InputField } from "../../../../../components/input/InputField";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import axios from "../../../../../api/axios";

export const AddCategory = ({ reload, setReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");

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
      const response = await axios.post(`/category`, formData, {
        "Content-Type": "multipart/form-data",
      });
      setReload(!reload);
      onClose();
      toast.success("Category added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add category");
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        file: "",
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
            + Category
          </Button>
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
                      placeholder="Enter your name here"
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
                          const selectedFile = e.target.files[0];
                          if (selectedFile) {
                            const allowedFileTypes = [
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                              "image/gif",
                            ];
                            if (allowedFileTypes.includes(selectedFile.type)) {
                              props.setFieldValue("file", selectedFile);
                            } else {
                              toast.error(
                                "Invalid file type. Please select a valid image file.",
                                {
                                  position: toast.POSITION.TOP_RIGHT,
                                  autoClose: 2000,
                                }
                              );
                            }
                          }
                        }}
                        variant="flushed"
                        type="file"
                        name="file"
                        placeholder="Choose file"
                        mb={4}
                        bgColor={"transparent"}
                        accept=".jpg, .jpeg, .png, .gif"
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
        </Box>
      )}
    </Formik>
  );
};
