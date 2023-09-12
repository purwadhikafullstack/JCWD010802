import { Flex, Heading } from "@chakra-ui/react"
import { ProductCardUser } from "../../../components/product/ProductCardUser"
// import { ProductCard } from "../../../components/product/ProductCard"

export const NewProduct = () => {
    const data = [
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Asus ROG Ally Z1 Extreme",
            price: "12000000",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
    ]
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Newest Product</Heading>
            <Flex gap={3} mt="20px" overflowX="scroll" pb="20px" maxW="1400px">
                <ProductCardUser data={data} />
                {/* <ProductCard data={data} /> */}
            </Flex>
        </Flex>
    )
}