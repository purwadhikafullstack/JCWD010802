import * as Yup from "yup"
import Swal from "sweetalert2"
import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputField } from "../../../components/input/InputField"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setEmail } from "../../../redux/regisSlice"
import axios from "../../../api/axios"

export const RegisterCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onRegister = async (data) => {
        try {
            const response = await axios.post("/auth/register", data)
            dispatch(setEmail({email: data.email, token: response.data.token}))
            Swal.fire({
                title: "Register Success!",
                text: "Please check your email to verify your account",
                icon: "success",
                confirmButtonText: "Okay",
                confirmButtonColor: "green"
            })
            setTimeout(() => {
                navigate("/onboard")
            },1500)
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
        <Flex direction="column" p="30px" align="center" w="full">
            <Flex direction="column" w="full" mb="30px">
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
            )}
            </Formik>
        </Flex>
    )
}