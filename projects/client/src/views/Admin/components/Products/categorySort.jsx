import { Select } from "@chakra-ui/react"


export const CategorySort = ({ handleSort, category }) => {
    return (
        <Select placeholder="Category" onChange={(e) => handleSort(e.target.value)} borderColor="black">
            {category?.map((item) => (
                <option color={"black"} key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Select>
    )
}