import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import { ResetPasswordForm } from "./components/resetPassForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';
import { useParams } from "react-router-dom";
export const ResetPassView = () => {
  const {token} = useParams()

const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await axios.patch(`http://localhost:8000/api/auth/reset`, {
      password: values.password,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      toast.success('Please Check Your Email', {
        position: 'top-center',
        autoClose: 3000, 
      })}
    console.log(response.data.message);
  } catch (error) {
    console.error(error.response.data.message);
    setFieldError('confirmPassword', error.response.data.message);
  } finally {
    setSubmitting(false);
  }
};
console.log(token);
    return (
        <Box p={8} mt={5}>
            <Heading textAlign={"center"} mb={3} color={"#9fd8cb"} fontSize={"5xl"}>
                Reset Your Password
            </Heading>
            <VStack mt={10}>
        <ResetPasswordForm onSubmit={handleSubmit}/>
        <Image
            alignContent={"center"}
            objectFit="cover"
            src={"https://img.freepik.com/free-vector/security-concept-illustration_114360-497.jpg?w=826&t=st=1693766567~exp=1693767167~hmac=c936dcfda222214f8bfeece8811ed7f0dcc51ece81ecd54d39eccb870d0822fa"}
            alt="#"
            />
            </VStack>
        </Box>
    )
  };
  
  