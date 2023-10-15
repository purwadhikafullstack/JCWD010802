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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import headersGen from "../../../../../api/headers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../../../api/axios";

export const ChangeImage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");
  const headers = headersGen(token);

  const CreateSchema = Yup.object().shape({
    file: Yup.mixed().required("Image profile is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
      const response = await axios.patch(`/user/changeImage`, formData, {
        headers,
        "Content-Type": "multipart/form-data",
      });
      toast.success("Image profile updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error updating image profile", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        file: null,
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
          <Button onClick={onOpen} colorScheme="green" size="xs">
            <Text> Change avatar </Text>
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change avatar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box as={Form}>
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
                      bgColor={"white"}
                      accept=".jpg, .jpeg, .png, .gif"
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
          <ToastContainer />
        </Box>
      )}
    </Formik>
  );
};
