import { Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { ProductCard } from "../../../components/product/ProductCard"
import { ProductLoading } from "./ProductLoading"

export const NewProduct = ({ data, isLoaded }) => {
    const navigate = useNavigate()

    const onClick = (id) => {
        navigate(`product/${id}`)
    }
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Newest Products</Heading>
            {isLoaded ? 
            <Flex gap={3} mt="20px" overflowX="scroll" pb="20px" maxW="1200px">
            {data?.map((item) => (
                <ProductCard 
                    name={item.name}
                    price={item.price}
                    image={item.productImg}
                    category={item.category.name}
                    onClick={() => onClick(item.id)}
                    isLoaded={isLoaded}
                />
            ))}
            </Flex> :
            <ProductLoading />
            }
        </Flex>
    )
}