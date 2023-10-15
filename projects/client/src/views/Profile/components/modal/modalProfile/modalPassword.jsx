import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
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
import { Form, Formik } from "formik";
import { InputField } from "../../../../../components/input/InputField";
import * as Yup from "yup";
import headersGen from "../../../../../api/headers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../../../api/axios";

export const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
  const [showPassword, setShowPassword] = useState(false);
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };

  const CreateSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const response = await axios.patch(`/user/changePassword`, data, {
        headers,
      });
      toast.success("Password change successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error to change password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }
  };
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        password: "",
        confirmPassword: "",
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
          <Text
            onClick={onOpen}
            color={"blue.400"}
            fontSize={"xs"}
            cursor={"pointer"}
          >
            Change password
          </Text>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change password</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box as={Form}>
                  <FormControl>
                    <InputField
                      label="Current password"
                      name="oldPassword"
                      id="oldPassword"
                      className="oldPassword"
                      type={showPassword ? "text" : "password"}
                      w="300px"
                      mb="10px"
                      placeholder="Enter your current password"
                    />
                    <InputField
                      label="New Password"
                      name="password"
                      id="password"
                      className="password"
                      type={showPassword ? "text" : "password"}
                      w="300px"
                      mb="10px"
                      placeholder="Enter your new password here"
                    />
                    <InputField
                      label="Confirm password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      w="300px"
                      mb="10px"
                      placeholder="Enter your confirm password here"
                    />
                    <Checkbox
                      textColor={"black"}
                      isChecked={showPassword}
                      onChange={SeePsw}
                      mb={4}
                    >
                      Show Password
                    </Checkbox>
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
