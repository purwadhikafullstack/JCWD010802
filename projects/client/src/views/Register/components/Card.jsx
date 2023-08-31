import * as Yup from "yup"
import axios from "axios"
import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputField } from "../../../components/input/InputField"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { Link } from "react-router-dom"


export const RegisterCard = () => {
    const [success, setSuccess] = useState(false)
    const onRegister = async (data) => {
        try {
            const response = await axios.post("http://localhost:7799/api/auth/register", data)
            setSuccess(true)
            console.log(response);
        } catch (error) {
            console.log(error);
            setSuccess(false)
        }
    }

    return (
        <Flex bg="white" direction="column" p="30px" align="center" mt="50px"
        shadow="md" borderRadius="10px">
            <Flex justifyContent="space-between" align="center" w="full" mb="30px">
                <Heading fontSize="22px">Register</Heading>
                <Text as={Link} to="/login">Login</Text>
            </Flex>
            <Formik
            initialValues={{email: ''}}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email is invalid').required('Email is required')
              })}
            onSubmit={(values, action) => {
                onRegister(values)
                if (success) {
                    action.resetForm()
                }
            }}
        >
            {(props) => (
            <Form>
                <Flex direction="column">
                    <InputField
                        label="Email"
                        name="email"
                        id="email"
                        className="email"
                        type="text"
                        w="300px"
                        mb="10px"
                        placeholder="Enter your email here"
                    />
                    <Button type="submit" mt="15px" bg="#0058AB" color="white">Submit</Button>
                </Flex>
            </Form>
            )}
            </Formik>
            <Text mt="20px">Or</Text>
            <Button w={'full'} bg="gray.200" leftIcon={<FcGoogle />}  mt="20px">
                <Center>
                    <Text>Register with Google</Text>
                </Center>
            </Button>
        </Flex>
    )
}