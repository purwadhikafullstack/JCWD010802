import { Box, Button, Flex } from "@chakra-ui/react"
import { ListAdmin } from "../components/Warehouse Admin/listAdmin"
import { AddAdminButton } from "../components/Warehouse Admin/addAdminButton"
import { useEffect, useState } from "react"

export const WarehouseAdmin = () =>{
    const [reload,setReload] = useState(0)

    useEffect(()=>{},[reload])
    return (
        <Box>
            <Flex justifyContent={"flex-end"}>
        <AddAdminButton setReload={setReload} reload={reload}/>
            </Flex>
            <Box mx={3}>
        <ListAdmin/>
            </Box>
        </Box>
    )
}