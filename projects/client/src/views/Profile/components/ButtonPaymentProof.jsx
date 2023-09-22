import { Button } from "@chakra-ui/react"
import { PaymentProof } from "./modal/modalOrder/PaymentProof"
import { useState } from "react"


export const ButtonPaymentProof = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button onClick={openModal} bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}}>Upload Payment</Button>
            <PaymentProof isOpen={isOpen} onClose={closeModal} id={id} />
        </>
    )
}