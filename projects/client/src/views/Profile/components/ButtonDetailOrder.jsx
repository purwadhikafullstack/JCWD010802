import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { DetailOrder } from "./modal/modalOrder/DetailOrder"


export const ButtonDetailOrder = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button onClick={openModal} bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}}>Detail</Button>
            <DetailOrder isOpen={isOpen} onClose={closeModal} data={data} />
        </>
    )
}