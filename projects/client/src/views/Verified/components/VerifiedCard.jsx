import headersGen from "../../../api/headers";
import axios from "../../../api/axios";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/input/InputField";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const VerifiedCard = () => {
  const { token } = useParams();
  const headers = headersGen(token);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const SeePsw = () => {
    setShowPassword(!showPassword);
  };
  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });
  const onVerified = async (data) => {
    try {
      const response = await axios.patch("/auth/verified", data, { headers });
      toast({
        title: "Success",
        description: "Success to verify your account",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  return (
    <Flex direction="column" p="30px" align="center" w="full">
      <Flex direction="column" mb="30px" w="full">
        <Heading fontSize="22px">Verify account</Heading>
        <Text mt="10px">Please verify your account first</Text>
      </Flex>
      <Formik
        initialValues={{
          name: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={CreateSchema}
        onSubmit={(values, action) => {
          onVerified(values);
          action.resetForm();
        }}
      >
        {(props) => (
          <Flex as={Form} direction="column" w="full">
            <InputField
              label="Name"
              name="name"
              id="name"
              className="name"
              type="text"
              mb="10px"
              placeholder="Enter your name here"
              bg="white"
            />
            <InputField
              label="Password"
              name="password"
              id="password"
              className="password"
              type={showPassword ? "text" : "password"}
              mb="10px"
              placeholder="Enter your password here"
              bg="white"
            />
            <InputField
              label="Confirm password"
              name="confirmPassword"
              id="confirmPassword"
              className="confirmPassword"
              type={showPassword ? "text" : "password"}
              mb="10px"
              bg="white"
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
            <Button
              type="submit"
              mt="15px"
              bg="#517664"
              color="white"
              _hover={{ color: "#517664", bg: "white" }}
            >
              Submit
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
};
