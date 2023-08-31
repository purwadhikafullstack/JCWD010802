import * as Yup from "yup"
import axios from "axios"
import { Button, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputField } from "../../../components/input/InputField"
import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth } from "../../../helpers/firebase"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setValue } from "../../../redux/userSlice"


export const LoginCard = () => {
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()
    const onLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:7799/api/auth/login", data)
            setSuccess(true)
            dispatch(setValue(response.data.result))
            toast({
                title: "Success",
                description: "Success loging in to your account!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
              })
              setTimeout(() => {
                navigate("/")
              }, 2000)
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
                <Text as={Link} to="/register">Register</Text>
            </Flex>
            <Formik
            initialValues={{email: ''}}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email is invalid').required('Email is required')
              })}
            onSubmit={(values, action) => {
                onLogin(values)
                action.resetForm()
                
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
                    <InputField
                        label="Password"
                        name="password"
                        id="password"
                        className="password"
                        type="password"
                        w="300px"
                        mb="10px"
                        placeholder="Enter your password here"
                    />
                    <Button type="submit" mt="15px" bg="#0058AB" color="white">Submit</Button>
                </Flex>
            </Form>
            )}
            </Formik>
            <Text mt="20px">Or</Text>
            <Button w={'full'} bg="gray.200" leftIcon={<FcGoogle />} mt="20px">
                <Center>
                    <Text>Sign In with Google</Text>
                </Center>
            </Button>
        </Flex>
    )
}