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
import axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";

export const ChangeImage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");

  const CreateSchema = Yup.object().shape({
    file: Yup.mixed().required("Image profile is required"),
  });

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("file", data.file);
      const response = await axios.patch(
        `http://localhost:8000/api/user/changeImage`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );
      onClose();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{
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
        </Box>
      )}
    </Formik>
  );
};
