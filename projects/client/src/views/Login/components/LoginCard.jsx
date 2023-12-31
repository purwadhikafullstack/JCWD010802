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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValue } from "../../../redux/userSlice";
import { setCart } from "../../../redux/cartSlice";
import { setPrice } from "../../../redux/totalPrice";
import { useState } from "react";

export const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation()
  const fromUser = location.state?.from?.pathname || "/"
  const fromAdmin = location.state?.from?.pathname || "/admin"

  const SeePsw = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password contains minimal 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onLogin = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      dispatch(setValue(response.data.result));
      toast({
        title: "Success",
        description: "Success loging in to your account!",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("token", response.data.token);
      if (response.data.result.roleId === 2) {
        localStorage.setItem(
          "warehouseId",
          response.data.result.warehouseAdmin.warehouseId || ""
        );
      }

      const cartResponse = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      const userCart = cartResponse.data.result;
      dispatch(setCart(userCart));
      dispatch(setPrice(cartResponse.data.totalPrice));
      setTimeout(() => {
        if (response.data.result.roleId === 1) {
          navigate(fromUser, { replace: true });
        } else {
          navigate(fromAdmin, { replace: true });
        }
      }, 2000);
    } catch (error) {
      toast({
        title: "Login Failed!",
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
        <Heading fontSize="22px">Sign In</Heading>
        <Text mt="10px">Log in to your account to start shopping</Text>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values, action) => {
          onLogin(values);
          action.resetForm();
        }}
      >
        {(props) => (
          <Flex as={Form} direction="column" w="full">
            <InputField
              label="Email"
              name="email"
              id="email"
              className="email"
              type="text"
              mb="10px"
              placeholder="Enter your email here"
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
            <Checkbox
              textColor={"black"}
              isChecked={showPassword}
              onChange={SeePsw}
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
            <Flex mt="5px" justifyContent={"space-between"} direction={{ base: "column", lg: "row"}}>
              <Flex gap={1}>
                <Text mt="5px" fontSize="14px">
                  Dont have an account?
                </Text>
                <Text
                  as={Link}
                  to="/register"
                  mt="5px"
                  color="#517664"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  Sign Up
                </Text>
              </Flex>
              <Flex>
                <Text
                  as={Link}
                  to="/forgot-password"
                  mt="5px"
                  color="#517664"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  Forgot password?
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
};
