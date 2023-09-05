import { Flex, Heading } from "@chakra-ui/react"
import { VerifiedCard } from "./components/VerifiedCard"

export const VerifiedView = () => {    
    return(
        <Flex justifyContent="center" m="auto" alignItems="center" direction="column" minH="100vh" bg="#edf3f8">
            <Heading>Warehouse</Heading>
            <VerifiedCard />
        </Flex>
    )
}