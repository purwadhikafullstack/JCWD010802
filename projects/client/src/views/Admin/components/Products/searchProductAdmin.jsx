import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"


export const SearchProductAdmin = ({ search, handleSearch }) => {
    return (
        <InputGroup>
            <Input
                variant="outline"
                placeholder="Search"
                _placeholder={{ color: "black" }}
                defaultValue={search}
                type={"search"}
                color={"black"}
                onChange={handleSearch}
                borderColor={"2px solid black"}
                w="60%"
            />
            <InputLeftElement>
                <Icon as={BsSearch} color={"gray.500"} />
            </InputLeftElement>
        </InputGroup>
    )
}