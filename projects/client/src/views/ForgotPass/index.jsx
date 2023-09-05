import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { ForgotPasswordForm } from "./components/forgotPassForm"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';
export const ForgotPassPageView = () => {

const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/forgot', {
      email: values.email,
    });
    if (response.status === 200) {
        toast.success('Please Check Your Email', {
          position: 'top-center',
          autoClose: 3000, 
        })}
    

    // Handle success (e.g., show a success message)
    console.log(response.data.message);
  } catch (error) {
    // Handle errors (e.g., display error message)
    console.error(error.response.data.message);
    setFieldError('email', error.response.data.message);
  } finally {
    setSubmitting(false);
  }
};

    return (
        <>
        <Box p={8} mt={5}>
            <ToastContainer/>
            <Heading textAlign={"center"} mb={3} color={"#9fd8cb"} fontSize={"5xl"}>
                Forgot your password?
            </Heading>
            <Text fontSize={"xl"} textAlign={"center"} mb={3}>
            Enter the registered e-mail. We will send you a verification link to reset your password.
            </Text>
            <VStack>
        <ForgotPasswordForm onSubmit={handleSubmit}/>
        <Image
            alignContent={"center"}
            objectFit="cover"
            src={"https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?size=626&ext=jpg&uid=R49827410&ga=GA1.2.1183367613.1692951927"}
            alt="#"
            />
            </VStack>
            </Box>
        </>
    )
}