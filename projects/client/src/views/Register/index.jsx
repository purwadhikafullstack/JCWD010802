import { Flex, Heading, Image } from "@chakra-ui/react"
import { RegisterCard } from "./components/Card"
import { Link } from "react-router-dom"


export const RegisterView = () => {    
    return(
        <Flex justifyContent="center" m="auto" alignItems="center" minH="100vh" bg="#edf3f8">
            <Flex h="100vh" w="50%" p="15px" display={{ base: "none", lg: "flex"}}>
                <Image src="https://www.lifewire.com/thmb/P1TZQWFtD_x4V8I77qDXd6Ae8F4=/5838x3894/filters:no_upscale():max_bytes(150000):strip_icc()/happy-woman-using-mobile-phone-on-sofa-516008710-5b85ec66c9e77c002c733634.jpg" 
                objectFit="cover" borderRadius="10px"/>
            </Flex>
            <Flex h="100vh" w="50%" direction="column" 
            align="center" p="15px">
                <Heading mt="10px" w={{ base: "unset", lg: "full"}} fontSize="20px" as={Link} to="/">
                    Warehouse
                </Heading>
                <RegisterCard />
            </Flex>
        </Flex>
    )
}