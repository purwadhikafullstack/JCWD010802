import { Flex, Heading } from "@chakra-ui/react"
import { ProductCard } from "../../../components/product/ProductCard"


export const TopProduct = () => {
    const data = [
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "iPhone 20 Pro Max XXL",
            price: "35000000",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
    ]
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Top Selling Products</Heading>
            <Flex gap={3} mt="20px" overflowX="scroll" pb="20px" maxW="1400px">
                <ProductCard data={data} />
            </Flex>
        </Flex>
    )
}