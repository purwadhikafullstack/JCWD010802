import { Badge, Button, Flex, Table, Td, Text, Th, Tr, useDisclosure } from "@chakra-ui/react"
import { ModalPayment } from "./ModalPayment"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formatIDR from "../../../../helpers/formatIDR"
import dateFormater from "../../../../helpers/dateFormater"
import "./style.css"
import axios from "../../../../api/axios";
import headersGen from "../../../../api/headers";


export const TableDetail = ({ id, data, reload }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const token = localStorage.getItem("token")
    const headers = headersGen(token)
    const handleConfirm = async () => {
        try {
            const response = await axios.patch(`/adminOrder/${id}`, {}, { headers })
            reload()
            toast.success('Order confirmed', {
                position: 'top-right',
                autoClose: 3000, 
              });
        } catch (error) {
            console.log(error);
            toast.error("Failed to confirm order", {
                position: "top-right",
                autoClose: 3000
            })
        }
    }
    const handleReject = async () => {
        try {
            await axios.put(`/adminOrder/${id}`, {}, { headers })
            reload()
            toast.success('Order rejected', {
                position: 'top-right',
                autoClose: 3000, 
              });
        } catch (error) {
            console.log(error);
            toast.error("Failed to reject order", {
                position: "top-right",
                autoClose: 3000
            })
        }
    }
    const handleCancel = async () => {
        try {
           await axios.put(`/adminOrder/cancel/${id}`, {}, { headers }) 
           reload()
           toast.success('Order cancelled', {
            position: 'top-right',
            autoClose: 3000, 
          });
        } catch (error) {
            console.log(error);
            toast.error("Failed to cancel order", {
                position: "top-right",
                autoClose: 3000
            })
        }
    }
    const handleSend = async () => {
        try {
           await axios.patch(`/adminOrder/send/${id}`, {}, { headers }) 
           reload()
           toast.success('Order sent', {
            position: 'top-right',
            autoClose: 3000, 
          });
        } catch (error) {
            console.log(error);
            toast.error("Failed to send order", {
                position: "top-right",
                autoClose: 3000
            })
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
        <>
        <ToastContainer />  
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
        </>
    )
}