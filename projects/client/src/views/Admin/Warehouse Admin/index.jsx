import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { ListAdmin } from "../components/Warehouse Admin/listAdmin"
import { AddAdminButton } from "../components/Warehouse Admin/addAdminButton"
import { useEffect, useState } from "react"

export const WarehouseAdmin = () =>{
    const [reload,setReload] = useState(0)

    useEffect(()=>{},[reload])
    return (
        <Box>
             <Heading py={5} ml={5}>
        Admin List
      </Heading>
            <Flex justifyContent={"flex-end"}  mx={3}>
        <AddAdminButton setReload={setReload} reload={reload}/>
            </Flex>
            <Box >
        <ListAdmin/>
            </Box>
        </Box>
    )
}