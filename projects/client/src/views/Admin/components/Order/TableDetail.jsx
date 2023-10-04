import { Badge, Button, Flex, Table, Td, Text, Th, Tr, useDisclosure } from "@chakra-ui/react"
import formatIDR from "../../../../helpers/formatIDR"
import axios from "axios"
import "./style.css"
import { ModalPayment } from "./ModalPayment"
import dateFormater from "../../../../helpers/dateFormater"


export const TableDetail = ({ id, data }) => {
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
           console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSend = async () => {
        try {
           const response = await axios.put(`http://localhost:8000/api/adminOrder/send/${id}`, {}, { headers }) 
           console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const getStatusBadgeColor = (status) => {
        switch (status) {
          case 'Menunggu Pembayaran':
            return 'yellow';
          case 'Menunggu Konfirmasi Pembayaran':
            return 'yellow';
          case 'Diproses':
            return 'blue';
          case 'Dikirim':
            return 'green';
          case 'Pesanan Dikonfirmasi':
            return 'teal';
          case 'Dibatalkan':
            return 'red';
          default:
            return 'gray';
        }
      };
    return (
        <Flex direction="column" w="full">
            <Table variant="simple" size="sm">
                <Tr>
                    <Th className="left-header">Total</Th>
                    <Td className="right-data">{formatIDR(data?.totalPrice)}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Shipping Cost</Th>
                    <Td className="right-data">{formatIDR(data?.shippingCost)}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Shipping Method</Th>
                    <Td className="right-data">{data?.shippingMethod}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Order Date</Th>
                    <Td className="right-data">{dateFormater(data?.createdAt)}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Customer ID</Th>
                    <Td className="right-data">{data?.userId}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Customer Name</Th>
                    <Td className="right-data">{data?.user?.name}</Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Payment Proof</Th>
                    <Td className="right-data">
                        <Flex align={{base: "flex-start", lg: "center"}} direction={{ base: "column", lg: "row"}} gap={1}>
                            <Text>{data?.paymentProof}</Text>
                            <Button mt={{ base: "10px", lg: "0"}} onClick={onOpen} display={data?.paymentProof ? "block" : "none"}>
                                Detail
                            </Button>
                        </Flex>
                    </Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Status</Th>
                    <Td className="right-data">
                        <Badge colorScheme={getStatusBadgeColor(data?.status?.name)}>
                            {data?.status?.name}
                        </Badge>
                    </Td>
                </Tr>
                <Tr>
                    <Th className="left-header">Action</Th>
                    <Td className="right-data">
                        <Flex direction={{ base: "column", lg: "row"}} gap={1}>
                            {data?.statusId < 4 ? 
                                <Button bg="red" color="white" onClick={handleCancel} _hover={{ bg: "red.600"}}>
                                Cancel
                                </Button> : null
                            }
                            {data?.statusId === 2 ? 
                            <>
                            <Button bg="orange" color="black" onClick={handleReject} _hover={{ bg: "orange.600"}}>
                                Reject
                            </Button>
                            <Button bg="green" color="white" onClick={handleConfirm} _hover={{ bg: "green.800"}}>
                                Confirm
                            </Button>
                            </> : null}
                            {data?.statusId === 3 ? 
                            <Button bg="green" color="white" onClick={handleSend} _hover={{ bg: "green.800"}}>
                                Send Order
                            </Button> : null
                            }
                        </Flex>
                    </Td>
                </Tr>
            </Table>
            <ModalPayment isOpen={isOpen} onClose={onClose} image={data?.paymentProof} />
        </Flex>
    )
}