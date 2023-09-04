import { Box, Button, Flex } from "@chakra-ui/react"
import { ListAdmin } from "../components/Warehouse Admin/listAdmin"
import { AddAdminButton } from "../components/Warehouse Admin/addAdminButton"

export const WarehouseAdmin = () =>{
    
    return (
        <Box>
            <Flex justifyContent={"flex-end"}>
        <AddAdminButton/>
            </Flex>
            <Box mx={3}>

        <ListAdmin/>
            </Box>
        </Box>
    )
}