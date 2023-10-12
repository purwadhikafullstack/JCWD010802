import { Box, Button, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { ForgotPasswordForm } from "./components/forgotPassForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBack } from "react-icons/io5";

import axios from "axios";
import { NotFound } from "../../pages/Error";
import { NavLink } from "react-router-dom";
import { useState } from "react";
export const ForgotPassPageView = () => {
  const token = localStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setIsSubmitting(true); 
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/forgot",
        {
          email: values.email,
        }
      );
      if (response.status === 200) {
        toast.success("Please Check Your Email", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
      setFieldError("email", error.response.data.message);
    } finally {
      setIsSubmitting(false); 
      setSubmitting(false);
    }
  };

  return (
    <>
      {token ? (
        <NotFound />
      ) : (
        <Box mt={5}>
          <ToastContainer />
          <NavLink to={"/login"}>
            <Button
              leftIcon={<IoArrowBack />}
              variant="ghost"
              mx={8}
              color={"#517664"}
              fontWeight={"bold"}
              _hover={{}}
            >
              Login
            </Button>
          </NavLink>
          <Heading
            textAlign={"center"}
            mb={3}
            color={"#517664"}
            fontSize={"5xl"}
          >
            Forgot your password?
          </Heading>
          <Text fontSize={"xl"} textAlign={"center"} mb={3}>
            Enter the registered e-mail. We will send you a verification link to
            reset your password.
          </Text>
          <VStack>
            <ForgotPasswordForm onSubmit={handleSubmit} />
            
              <Image
                alignContent={"center"}
                objectFit="cover"
                src={
                  "https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?size=626&ext=jpg&uid=R49827410&ga=GA1.2.1183367613.1692951927"
                }
                alt="#"
              />
          </VStack>
        </Box>
      )}
    </>
  );
};
