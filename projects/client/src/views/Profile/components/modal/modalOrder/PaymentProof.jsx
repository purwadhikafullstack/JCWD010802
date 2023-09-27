import { Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { ErrorMessage, Form, Formik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { InputField } from "../../../../../components/input/InputField";


export const PaymentProof = ({ isOpen, onClose, id, reload }) => {
    const token = localStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const handleSubmit = async (value) => {
        try {
            const data = new FormData()
            data.append("file", value.file)
            const response = await axios.patch(`http://localhost:8000/api/userOrder/payment/${id}`, data, { headers })
            toast.success('Payment proof successfuly uploaded!', {
                position: 'top-right',
                autoClose: 3000, 
            });
            console.log(response);
            reload()
            onClose()
        } catch (error) {
            toast.error('Failed to upload your payment proof!', {
                position: 'top-right',
                autoClose: 3000, 
            });
            console.log(error);
        }
    }

    return (
        <>
        <ToastContainer />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Upload Your Payment
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik initialValues={{ file: "" }} validationSchema={Yup.object().shape({
                    file: Yup.mixed().required("Please attach your payment proof")})}
                    onSubmit={(value) => handleSubmit(value)}>
                        {(props) => (
                            <Flex as={Form} direction="column" w="full" gap={3}>
                                <FormControl>
                                    <ErrorMessage
                                    component="div"
                                    name="file"
                                    style={{ color: "red" }}
                                    />
                                    <Input
                                    onChange={(e) => {
                                        props.setFieldValue("file", e.target.files[0]);
                                    }}
                                    variant="flushed"
                                    type="file"
                                    name="file"
                                    placeholder="Choose file"
                                    bgColor={"white"}
                                    />
                                </FormControl>
                                <Flex w="full" gap={2} justify="flex-end">
                                    <Button onClick={onClose} >Close</Button>
                                    <Button bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}} type="submit">Submit</Button>
                                </Flex>
                            </Flex>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal> 
        </>
    )
}