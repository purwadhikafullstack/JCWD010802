import { Select } from "@chakra-ui/react"


export const CategorySort = ({ handleSort, category }) => {
    return (
        <Select placeholder="Category" onChange={handleSort}>
            {category?.map((item) => (
                <option color={"black"} key={item.id} value={item.id}>
                    {category.name}
                </option>
            ))}
        </Select>
    )
}