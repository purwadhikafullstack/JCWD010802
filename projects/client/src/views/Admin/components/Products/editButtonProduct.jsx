import { IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { EditProduct } from "./editProduct"
import { AiFillEdit } from "react-icons/ai"


export const EditProductButton = ({ category, product, reload }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <IconButton icon={<AiFillEdit />} onClick={openModal} m={2} bg={"#2d3319"} color={"white"} />
            <EditProduct isOpen={isOpen} onClose={closeModal} category={category} product={product} reload={reload} />
        </>
    )
}