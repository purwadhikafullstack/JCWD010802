import headersGen from "../../../api/headers";
import axios from "../../../api/axios";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/input/InputField";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const VerifiedCard = () => {
  const { token } = useParams();
  const headers = headersGen(token)
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await axios.patch("/auth/verified", data, { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      bg="white"
      direction="column"
      p="30px"
      align="center"
      mt="50px"
      shadow="md"
      borderRadius="10px"
    >
      <Flex justifyContent="space-between" align="center" w="full" mb="30px">
        <Heading fontSize="22px">Verified user</Heading>
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
          <Form>
            <Flex direction="column">
              <InputField
                label="Name"
                name="name"
                id="name"
                className="name"
                type="text"
                w="300px"
                mb="10px"
                placeholder="Enter your name here"
              />
              <InputField
                label="Password"
                name="password"
                id="password"
                className="password"
                type={showPassword ? "text" : "password"}
                w="300px"
                mb="10px"
                placeholder="Enter your password here"
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
              <Button type="submit" mt="15px" bg="#0058AB" color="white">
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};
