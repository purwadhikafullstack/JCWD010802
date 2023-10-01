import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { ConfirmOrder } from "./modal/modalOrder/ConfirmOrder"



export const ButtonConfirmOrder = ({ id, reload }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button onClick={openModal} bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}}>Confirm</Button>
            <ConfirmOrder isOpen={isOpen} onClose={closeModal} id={id} reload={reload} />
        </>
    )
}