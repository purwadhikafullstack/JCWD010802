import { IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { DeleteProduct } from "./deleteProduct"
import { BsFillTrash3Fill } from "react-icons/bs"


export const DeleteProductButton = ({ product, reload }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <IconButton icon={<BsFillTrash3Fill />} onClick={openModal} m={2} bg={"red"} color={"white"}/>
            <DeleteProduct isOpen={isOpen} onClose={closeModal} product={product} reload={reload} />
        </>
    )
}