import { Flex, Heading } from "@chakra-ui/react"
import { LoginCard } from "./components/LoginCard"


export const LoginView = () => {
    return (
        <Flex justifyContent="center" m="auto" alignItems="center" direction="column" minH="100vh" bg="#edf3f8">
            <Heading>Warehouse</Heading>
            <LoginCard />
        </Flex>
    )
}