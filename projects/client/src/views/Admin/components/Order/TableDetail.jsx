import { Button, Flex, Table, Td, Text, Th, Tr, useDisclosure } from "@chakra-ui/react"
import formatIDR from "../../../../helpers/formatIDR"
import axios from "axios"
import "./style.css"
import { ModalPayment } from "./ModalPayment"


export const TableDetail = ({ id }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const token = localStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const handleConfirm = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/adminOrder/${id}`, {}, { headers })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleReject = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/adminOrder/${id}`, {}, { headers })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCancel = async () => {
        try {
           const response = await axios.put(`http://localhost:8000/api/adminOrder/cancel/${id}`, {}, { headers }) 
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Flex direction="column" w="full">
            <Table variant="simple" size="sm">
                <Tr>
                    <Th className="left-header">Invoice</Th>
                    <Td className="right-data">INV/123/27092023</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Total</Th>
                    <Td className="right-data">{formatIDR(1200000)}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Quantity</Th>
                    <Td className="right-data">1</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Shipping Cost</Th>
                    <Td className="right-data">{formatIDR(10000)}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Shipping Method</Th>
                    <Td className="right-data">JNE</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Order Date</Th>
                    <Td className="right-data">27 September 2023</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Customer ID</Th>
                    <Td className="right-data">69</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Customer Name</Th>
                    <Td className="right-data">Fathir Suryadi</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Payment Proof</Th>
                    <Td className="right-data">
                        <Flex align={{base: "flex-start", lg: "center"}} direction={{ base: "column", lg: "row"}} gap={1}>
                            <Text>paymentImg-169526178821187630.jpeg</Text>
                            <Button mt={{ base: "10px", lg: "0"}} onClick={onOpen}>Detail</Button>
                        </Flex>
                    </Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Status</Th>
                    <Td className="right-data">
                        <Flex direction={{ base: "column", lg: "row"}} gap={1}>
                            <Button bg="red" color="white" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button bg="orange" color="black" onClick={handleReject}>
                                Reject
                            </Button>
                            <Button bg="green" color="white" onClick={handleConfirm}>
                                Confirm
                            </Button>
                        </Flex>
                    </Td>
                </Tr>
            </Table>
            <ModalPayment isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}