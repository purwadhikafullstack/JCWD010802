import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { CancelOrder } from "./modal/modalOrder/CancelOrder"


export const ButtonCancelOrder = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button onClick={openModal} bg={"red"} color={'white'} _hover={{bg:"#2d3319"}}>Cancel Order</Button>
            <CancelOrder isOpen={isOpen} onClose={closeModal} id={id}/>
        </>
    )
}