import { Flex, Heading, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { OnboardCard } from "./components/OnboardCard"


export const OnboardingView = () => {    
    return(
        <Flex justifyContent="center" m="auto" alignItems="center" minH="100vh" bg="#edf3f8">
            <Flex h="100vh" w="50%" p="15px" display={{ base: "none", lg: "flex"}}>
                <Image src="https://mynewzportal.com/wp-content/uploads/2021/05/high-tech-gadgets.jpg" 
                objectFit="cover" borderRadius="10px"/>
            </Flex>
            <Flex h="100vh" w={{ base: "full", lg: "50%"}} direction="column" 
            align="center" justifyContent={{ base: "center", lg: "flex-start"}} p="15px">
                <Heading mt="10px" w={{ base: "unset", lg: "full"}} fontSize="20px" as={Link} to="/">
                    techtok.id
                </Heading>
                <OnboardCard />
            </Flex>
        </Flex>
    )
}