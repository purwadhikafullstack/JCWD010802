import { Flex, Image, Text } from "@chakra-ui/react"
import { UploadBanner } from "./UploadBanner"
import { AddBanner } from "./AddBanner"


export const BannerCard = ({ data, headers, reload }) => {
    return (
        <Flex direction="column" w="full" gap={3}>
            <Text>Current Home Page Banner</Text>
            <Flex gap={2} flexWrap="wrap">
                {data?.map((item) => (
                    <>
                        <Image src={`${process.env.REACT_APP_BASE_URL}/bannerImg/${item?.bannerImg}`} w="30%" />
                    </>
                ))}
            </Flex>
            <Text>Manage Home Page Banner (Max 4 Banners)</Text>
            <Flex gap={5} direction="column" w="full">
                {data?.map((item) => (
                    <UploadBanner data={item?.bannerImg} headers={headers} id={item?.id} reload={reload} />
                ))}
                {data?.length < 4 ? <AddBanner headers={headers} reload={reload} /> : null}
            </Flex>
        </Flex>
    )
}