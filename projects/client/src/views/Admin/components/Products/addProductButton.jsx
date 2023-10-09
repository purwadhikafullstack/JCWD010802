import { Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { AddProduct } from "./addProduct"
import { AiOutlinePlus } from "react-icons/ai"


export const AddProductButton = ({ category, reload }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <Flex justify="flex-end">
            <Button onClick={openModal} bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}}>
                <Flex gap={1} align={"center"}>
                    <AiOutlinePlus />
                    <Text display={{ base: "none", md: "inline-block"}}>New Product</Text>
                </Flex>
            </Button>
            <AddProduct isOpen={isOpen} onClose={closeModal} category={category} reload={reload} />
        </Flex>
    )
}