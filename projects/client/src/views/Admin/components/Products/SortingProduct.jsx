import { Select } from "@chakra-ui/react"


export const SortingProduct = ({ handleSort }) => {
    return (
        <Select placeholder="Sort" onChange={(e) => handleSort(e.target.value)} borderColor="black">
            <option value="az">Name (A-Z)</option>
            <option value="za">Name (Z-A)</option>
            <option value="lowest">Price (0-9)</option>
            <option value="highest">Price (9-0)</option>
        </Select>
    )
}