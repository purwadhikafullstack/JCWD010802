import * as Yup from "yup"
import axios from "axios"
import { Button, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputField } from "../../../components/input/InputField"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

export const RegisterCard = () => {
    const onRegister = async (data) => {
        try {
            await axios.post("http://localhost:8000/api/auth/register", data)
            Swal.fire({
                title: "Register Success!",
                text: "Please check your email to verify your account",
                icon: "success",
                confirmButtonText: "Okay",
                confirmButtonColor: "green"
            })
        } catch (error) {
            Swal.fire({
                title: "Registration Failed!",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "Okay",
                confirmButtonColor: "red"
            })
        }
    }

    return (
        <Flex direction="column" p="30px" align="center" w="60%">
            <Flex direction="column" w="312px" mb="30px">
                <Heading fontSize="22px">Sign In</Heading>
                <Text mt="10px">Create your account to start finding your dream gadget here</Text>
            </Flex>
            <Formik
            initialValues={{email: ''}}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email is invalid').required('Email is required')
              })}
            onSubmit={(values, action) => {
                onRegister(values)
                action.resetForm()
                
            }}
        >
            {(props) => (
            <Form>
                <Flex direction="column" w="312px">
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
                    <Button type="submit" mt="15px" bg="#517664" color="white"
                    _hover={{color: "#517664", bg: "white"}}>
                        Submit
                    </Button>
                    <Flex gap={1} mt="5px">
                        <Text mt="5px" fontSize="14px">
                            Been here before?
                        </Text>
                        <Text as={Link} to="/login" mt="5px" color="#517664"
                        fontSize="14px" fontWeight="bold">
                            Sign In
                        </Text>
                    </Flex>
                </Flex>
            </Form>
            )}
            </Formik>
            <Text mt="10px">Or</Text>
            <Button w="312px" bg="gray.200" leftIcon={<FcGoogle />} mt="10px">
                <Center>
                    <Text>Register with Google</Text>
                </Center>
            </Button>
        </Flex>
    )
}