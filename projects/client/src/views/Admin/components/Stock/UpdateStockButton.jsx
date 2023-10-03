import { Button } from "@chakra-ui/react"
import { ModalUpdateStock } from "./ModalUpdateStock"
import { AiFillEdit } from "react-icons/ai"
import { useState } from "react"
import { useLocation } from "react-router-dom"


export const UpdateStcokButton = ({ data, reload }) => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const warehouseId = params.get("warehouseId") || "";

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button leftIcon={<AiFillEdit />} onClick={openModal} _hover={{ bg: "#2d3319" }}
            isDisabled={!warehouseId ? true : false} bg="#517664" color="white">
                Stock
            </Button>
            <ModalUpdateStock isOpen={isOpen} onClose={closeModal} data={data} triggerReload={reload} />
        </>
    )
}