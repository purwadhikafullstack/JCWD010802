import { Flex, Heading } from "@chakra-ui/react"
import { RegisterCard } from "./components/Card"



export const RegisterView = () => {    
    return(
        <Flex justifyContent="center" m="auto" alignItems="center" direction="column" minH="100vh" bg="#edf3f8">
            <Heading>Warehouse</Heading>
            <RegisterCard />
        </Flex>
    )
}