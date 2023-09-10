import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { useField } from "formik"


export const SelectField = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Select {...field} {...props} w={{ base: "100%", md: "auto" }}>
                {props.children}
            </Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}