import { Flex, Table, TableContainer } from "@chakra-ui/react"
import { ProductCardAdmin } from "../../../../components/product/ProductCardAdmin"
import { ProductTable } from "./ProductTable"


export const ProductList = ({ reload, product, category }) => {
    
    return (
        <Flex w="full">
            <ProductTable reload={reload} product={product} category={category} />
        </Flex>
    )
}