import { Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import headersGen from "../../../api/headers"
import axios from "../../../api/axios"
import { BannerCard } from "../components/Banner/BannerCard"


export const Banner = () => {
    const [banner, setBanner] = useState()
    const [reload, setReload] = useState(0)
    const token = localStorage.getItem("token")
    const headers = headersGen(token)

    const getBanner = async () => {
        try {
            const response = await axios.get("/banner")
            setBanner(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const triggerReload = () => {
        setReload(!reload)
    }
    useEffect(() => {
        getBanner()
    },[reload])
    return (
        <Flex direction="column" gap={5} p="10px">
            <Heading fontSize="24px">Home Page Banner</Heading>
            <BannerCard data={banner} headers={headers} reload={triggerReload} />
        </Flex>
    )
}