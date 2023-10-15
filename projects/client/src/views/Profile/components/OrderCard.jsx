import { Badge, Flex, Image, Text } from "@chakra-ui/react"
import { ButtonPaymentProof } from "./ButtonPaymentProof"
import { ButtonDetailOrder } from "./ButtonDetailOrder"
import { ButtonConfirmOrder } from "./ButtonConfirmOrder"
import { ButtonCancelOrder } from "./ButtonCancelOrder"
import formatIDR from "../../../helpers/formatIDR"
import dateFormater from "../../../helpers/dateFormater"
import { ButtonOrderOption } from "./OrderOptionMobile"


export const OrderCard = ({ data, reload }) => {
    let color
    if (data?.statusId === 1 || data?.statusId === 2 || data?.statusId === 3 || data?.statusId === 4) color = "orange"
    else if (data?.statusId === 5) color = "green"
    else color = "red"

    return(
        <Flex w="full" direction="column" bg="white" p="20px 30px" borderRadius="10px" shadow="md">
            <Flex align="center" gap={3} fontSize="14px" w="full" justifyContent="space-between">
                <Flex align="center" gap={3}>
                    <Text fontWeight="bold">Belanja</Text>
                    <Text color="gray.500" display={{ base: "none", md: "block"}}>{data?.invoice}</Text>
                    <Text display={{ base: "none", md: "block"}}>{dateFormater(data?.createdAt)}</Text>
                    <Badge colorScheme={color} maxW={{base: "150px", lg: "none"}}>
                        <Text maxW={{ base: "140px", lg: "none"}} overflow="hidden"  whiteSpace="nowrap" textOverflow="ellipsis">
                            {data?.status.name}
                        </Text>
                    </Badge>
                </Flex>
                <Flex display={{ base: "flex", lg: "none"}}>
                    <ButtonOrderOption data={data} reload={reload}  />
                </Flex>
            </Flex>
            <Flex align={{base: "flex-start", md: "center"}} justifyContent="space-between" direction={{ base: "column", md: "row"}} mt="10px">
                <Flex justifyContent="center" direction={{ base: "column", md: "row"}} gap={5}>
                    <Image src={`${process.env.REACT_APP_BASE_URL}/productImg/${data?.orderItems[0]?.product?.productImg}`} maxW="120px"/>
                    <Flex direction="column" justify="center" gap={1}>
                        <Text fontWeight="bold">{data?.orderItems[0]?.product?.name}</Text>
                        <Text fontSize="14px" color="gray.500">{`${data?.orderItems[0]?.quantity} item x ${formatIDR(data?.orderItems[0]?.product?.price)}`}</Text>
                        {data?.orderItems?.length > 1 ? 
                        <Text fontSize="14px" color="gray.500">{`+${data?.orderItems?.length - 1} other product`}</Text> : null}
                    </Flex>
                </Flex>
                <Flex direction="column">
                    <Text color="gray.500" fontSize="14px">Total</Text>
                    <Text>{formatIDR(data?.totalPrice)}</Text>
                </Flex>
            </Flex>
            <Flex justify="flex-end" gap={2} display={{ base: "none", lg: "flex"}}>
                <ButtonDetailOrder data={data} />
                {data?.statusId === 1 ? <ButtonCancelOrder id={data?.id} reload={reload} /> : null}
                {data?.statusId === 1 ? <ButtonPaymentProof id={data?.id} reload={reload}/> : null}
                {data?.statusId === 4 ? <ButtonConfirmOrder id={data?.id} reload={reload} /> : null}
            </Flex>
        </Flex>
    )
}