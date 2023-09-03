import { Button, Center, Flex, HStack, Heading, Text, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useSelector } from "react-redux"


export const OnboardCard = () => {
    const regis = useSelector((state) => state.regis.value)
    const data = {
        email: regis.email,
        regisToken: regis.token
    }
    console.log(data);

    const onResend = async () => {
        try {
            const response = await axios.put("http://localhost:8000/api/auth/resend", data)
            console.log(response);
        } catch (error) {
            console.log(error);
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