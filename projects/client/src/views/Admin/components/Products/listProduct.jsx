import { Flex } from "@chakra-ui/react"
import { ProductCardAdmin } from "../../../../components/product/ProductCardAdmin"


export const ProductList = ({ reload, product, category }) => {
    
    return (
        <Flex justifyContent={{base: "center", md: "flex-start"}} gap={3} mt="20px" wrap={"wrap"} pb="20px" maxW="1400px">
            <ProductCardAdmin data={product} category={category} reload={reload} />
        </Flex>
    )
}