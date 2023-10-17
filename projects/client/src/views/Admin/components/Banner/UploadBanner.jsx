import * as Yup from "yup"
import axios from "../../../../api/axios"
import { ErrorMessage, Form, Formik } from "formik"
import { Button, Flex, FormControl, Image, Input } from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';

export const UploadBanner = ({ data, headers, id, reload }) => {
    const bannerSchema = Yup.object().shape({
        file: Yup.mixed().required("Please choose banner image")
    })
    const initialValues = {
        file: data
    }
    const handleSubmit = async (value) => {
        try {
            const data = new FormData()
            data.append("file", value.file)
            data.append("currentId", id)
            await axios.post("/banner", data, { headers })
            reload()
            toast.success('successfully upload banner', {
                position: 'top-right',
                autoClose: 3000, 
            });
        } catch (error) {
            console.log(error);
            toast.error('Failed to upload banner. Please try again later.', {
                position: "top-right",
                autoClose: 3000
            });
        }
    }
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={bannerSchema}
        onSubmit={(value) => handleSubmit(value)}
        >
            {(props) => (
                <Flex as={Form} gap={2} w="full" align="center" direction={{ base: "column", lg: "row"}}>
                    <ToastContainer />
                    <Image src={`${process.env.REACT_APP_BASE_URL}/bannerImg/${data}`} w="200px" />
                    <Flex direction="column" gap={1} w="full">
                        <FormControl>
                        <Input
                        onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                                const allowedFileTypes = [
                                    "image/jpeg",
                                    "image/jpg",
                                    "image/png",
                                    "image/gif",
                                ];
                                if (allowedFileTypes.includes(selectedFile.type)) {
                                    props.setFieldValue("file", selectedFile);
                                } else {
                                    toast.error(
                                        "Invalid file type. Please select a valid image file.",
                                        {
                                            position: toast.POSITION.TOP_RIGHT,
                                            autoClose: 2000,
                                        }
                                        );
                                    }
                                }
                        }}
                        variant="flushed"
                        type="file"
                        name="file"
                        placeholder="Choose file"
                        mb={4}
                        accept=".jpg, .jpeg, .png, .gif"
                        borderBottomColor="black"
                        />
                        <ErrorMessage
                        component="div"
                        name="file"
                        style={{ color: "red" }}
                        />  
                    </FormControl>
                    <Button type="submit" bg="#517664" color="white" _hover={{ bg: "#2d3319" }} w="100px">
                        Confirm
                    </Button>
                    </Flex>
                </Flex>
            )}
        </Formik>
    )
}