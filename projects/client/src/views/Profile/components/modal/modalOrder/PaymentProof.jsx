import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import headersGen from "../../../../../api/headers";
import axios from "../../../../../api/axios";

export const PaymentProof = ({ isOpen, onClose, id, reload }) => {
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
  const handleSubmit = async (value) => {
    try {
      const data = new FormData();
      data.append("file", value.file);
      const response = await axios.patch(`/userOrder/payment/${id}`, data, {
        headers,
      });
      toast.success("Payment proof successfuly uploaded!", {
        position: "top-right",
        autoClose: 3000,
      });
      reload();
      onClose();
    } catch (error) {
      toast.error("Failed to upload your payment proof!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Your Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ file: "" }}
              validationSchema={Yup.object().shape({
                file: Yup.mixed().required("Please attach your payment proof"),
              })}
              onSubmit={(value) => handleSubmit(value)}
            >
              {(props) => (
                <Flex as={Form} direction="column" w="full" gap={3}>
                  <FormControl>
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
                      bgColor={"white"}
                      accept=".jpg, .jpeg, .png, .gif"
                    />
                  </FormControl>
                  <Flex w="full" gap={2} justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                    <Button
                      bg={"#517664"}
                      color={"white"}
                      _hover={{ bg: "#2d3319" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};