import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { AddProduct } from "./addProduct"


export const AddProductButton = ({ category, reload }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button onClick={openModal} bg={"#517664"} m={2}color={'white'} _hover={{bg:"#2d3319"}}>
                + Add New Product
            </Button>
            <AddProduct isOpen={isOpen} onClose={closeModal} category={category} reload={reload} />
        </>
    )
}