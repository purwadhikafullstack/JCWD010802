import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import { ResetPasswordForm } from "./components/resetPassForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
export const ResetPassView = () => {
  const {token} = useParams()
const navigate = useNavigate()
const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await axios.patch(`/auth/reset`, {
      password: values.password,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      toast.success('Password has been change!', {
        position: 'top-center',
      })
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message)
    setFieldError('confirmPassword', error.response.data.message);
  } finally {
    setSubmitting(false);
  }
};
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
  
  