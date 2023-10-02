import { Flex, Heading } from "@chakra-ui/react"
import { CategoryCard } from "./CategoryCard"
import { useNavigate } from "react-router-dom"

export const Category = ({ data, isLoaded }) => {
    const navigate = useNavigate()

    const onClick = (id) => {
        navigate(`product?search=&sort=&category=${id}`)
        window.scrollTo(0, 0);
    }
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Category</Heading>
            <Flex gap={3} mt="20px" pb="20px" overflowX="scroll" maxW="1200px">
                <CategoryCard data={data} onClick={onClick} isLoaded={isLoaded} />
            </Flex>
        </Flex>
    )
}