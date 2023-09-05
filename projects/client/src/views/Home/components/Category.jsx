import { Flex, Heading } from "@chakra-ui/react"
import { CategoryCard } from "./CategoryCard"


export const Category = () => {
    const data = [
        {
            name: "Smartphone and Tablet",
            img: "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_13_green_1_4.jpg"
        },
        {
            name: "Audio",
            img: "https://cdn.eraspace.com/media/catalog/product/l/o/loops_bluetooth_headphone_anc_pro_x02_-_black1_1.jpg"
        },
        {
            name: "Drone",
            img: "https://cdn.eraspace.com/media/catalog/product/d/j/dji_air_3_fly_more_combo_1_3_1.jpg"
        },
        {
            name: "Entertainment",
            img: "https://cdn.eraspace.com/media/catalog/product/a/s/asus_rog_ally_z1_extreme_white_1.jpg"
        },
        {
            name: "Camera and Video",
            img: "https://www.pixm.com/dbimages/ex_lg_14098.jpg"
        },
        {
            name: "Computer",
            img: "https://cdn.eraspace.com/media/catalog/product/h/u/huawei_matebook_x_pro_20221.jpg"
        },
        {
            name: "Wearable",
            img: "https://cdn.eraspace.com/media/catalog/product/g/a/garmin_approach_s70_42_mm_white_1.jpg"
        },
    ]
    return (
        <Flex direction="column" px={{base: "20px", lg: "50px"}} py="30px" maxW="100vw">
            <Heading fontSize="22px">Category</Heading>
            <Flex gap={3} mt="20px" pb="20px" overflowX="scroll" maxW="1400px">
                <CategoryCard data={data} />
            </Flex>
        </Flex>
    )
}