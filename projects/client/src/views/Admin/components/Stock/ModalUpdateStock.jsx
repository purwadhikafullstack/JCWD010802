import { Button, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { SelectField } from "../../../../components/input/SelectField";
import { InputField } from "../../../../components/input/InputField";
import { ToastContainer, toast } from 'react-toastify';
import { ProductCardModal } from "./CardModal";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import headersGen from "../../../../api/headers";
import axios from "../../../../api/axios";


export const ModalUpdateStock = ({ data, isOpen, onClose, triggerReload }) => {
    const token = localStorage.getItem("token")
    const headers = headersGen(token)
    const initialValues = {
        description: "",
        quantity: data?.totalQuantity,
        productId: data?.productId,
        warehouseId: data?.warehouse?.id,
        stockId: data?.id
    }
    const updateSchema = Yup.object().shape({
        description: Yup.string().required("Please fill the description"),
        quantity: Yup.number().required("Please enter the quantity")
    })
    const handleSubmit = async (value) => {
        try {
            const response = await axios.patch('http://localhost:8000/api/stock', value, { headers })
            onClose()
            triggerReload()
            toast.success('successfully updated stock', {
                position: 'top-right',
                autoClose: 3000, 
              });
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update", {
                position: "top-right",
                autoClose: 3000
            })
        }
    }
    return (
        <>
        <ToastContainer />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Update Stock</ModalHeader>
            <ModalBody>
                <Formik 
                initialValues={initialValues}
                validationSchema={updateSchema}
                onSubmit={(value) => {
                    handleSubmit(value)
                }}
                >
                    {() => (
                        <Flex as={Form} w="full" direction="column" gap={3}>
                            <ProductCardModal data={data} />
                            <SelectField
                            label="Description"
                            name="description"
                            id="description"
                            className="description"
                            placeholder="Description">
                                <option value="Add">Add</option>
                                <option value="Reduce">Reduce</option>
                            </SelectField>
                            <InputField
                            label="Quantity"
                            name="quantity"
                            id="quantity"
                            className="quantity"
                            type="number" />
                            <Flex w="full" justify="flex-end" gap={2} mb={2}>
                                <Button onClick={onClose} mt={4} bg={"red.500"} color={"white"} _hover={{ bg: "red.700" }}>
                                    Cancel
                                </Button>
                                <Button type="submit" mt={4} bg="#517664" color="white" _hover={{ bg: "#2d3319" }}>
                                    Confirm
                                </Button>
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