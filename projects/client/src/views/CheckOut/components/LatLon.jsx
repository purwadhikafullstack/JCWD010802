import { Box, Heading, Text } from "@chakra-ui/react"

export const LatLon = ({id,primid}) => {
    return(
        <Box>
            <Heading></Heading>
            <Text>Selected id : {id}</Text>
            <Text>primary id: {primid}</Text>
        </Box>
    )
}