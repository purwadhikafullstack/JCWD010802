import { Flex, Heading, Text } from "@chakra-ui/react"
import axios from "axios"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"


export const OnboardCard = () => {
    const regis = useSelector((state) => state.regis.value)
    const data = {
        email: regis.email,
        regisToken: regis.token
    }

    const onResend = async () => {
        try {
            await axios.put("http://localhost:8000/api/auth/resend", data)
            Swal.fire({
                title: "Resend Email Success!",
                text: "Please check your email to verify your account",
                icon: "success",
                confirmButtonText: "Okay",
                confirmButtonColor: "green"
            })
        } catch (error) {
            Swal.fire({
                title: "Failed to resend email!",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "Okay",
                confirmButtonColor: "red"
            })
        }
    }

    return (
        <Flex direction="column" p="30px" align="center" w="full" mt={{ base: "0", lg: "50px"}}>
            <Flex direction="column" mb="30px">
                <Heading fontSize="22px">Please Verify Your Account</Heading>
                <Text mt="10px">
                    You have successfuly registered your account! Please check your email
                    to verify your acount.
                </Text>
                <Flex direction={{ base: "column", lg: "row"}} mt="10px">
                    <Text mr="10px">Haven't got the email yet?</Text>
                    <Text color="#517664" as="u" onClick={onResend} cursor="pointer">
                        Click here to resend confirmation email.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}