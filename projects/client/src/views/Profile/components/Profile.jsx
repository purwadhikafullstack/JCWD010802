import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { InputField } from "../../../components/input/InputField";
import { Form, Formik } from "formik";
import { ChangeImage } from "./modal/modalProfile/modalImage";
import { ChangePassword } from "./modal/modalProfile/modalPassword";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import headersGen from "../../../api/headers";
import axios from "../../../api/axios";

export const ProfileCard = () => {
  const profile = useSelector((state) => state.user.value)
  const token = localStorage.getItem("token");
  const headers = headersGen(token)
  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
  });
  const EditProfile = async (data) => {
    try {
      await axios.patch(`/user/edit`, data, { headers });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.log(error);
    }
  };

  return (
    <Flex direction={{ base: "column", lg: "row" }}>
      <Box
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        minW={"auto"}
        bgColor={"whiteAlpha.700"}
      >
        <Flex justifyContent={"center"} alignItems={"center"} w="full">
          <VStack spacing={5}>
            <Avatar size="2xl"src={`http://localhost:8000/profileImg/${profile.profileImg}`} name={profile.name}/>
            <ChangeImage />
          </VStack>
        </Flex>
      </Box>
      
      <Box
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        ml={{ base: "0", lg: 50 }}
        w={'full'}
        bgColor={"whiteAlpha.700"}
      >
        <Box>
          <Formik
            initialValues={{
              name: profile.name,
              email: profile.email
            }}
            validationSchema={CreateSchema}
            onSubmit={(values, action) => {
              EditProfile(values);
              action.resetForm();
            }}
          >
            {(props) => (
              <Form>
                <InputField
                  label="Name"
                  name="name"
                  id="name"
                  className="name"
                  type="text"
                  w={'full'}
                  mb="10px"
                  placeholder="Enter your name here"
                  variant="flushed"
                />
                <InputField
                  label="Email"
                  name="email"
                  id="email"
                  className="email"
                  type="email"
                  w={'full'}
                  mb="10px"
                  placeholder="Enter your email here"
                  variant="flushed"
                />
                <ChangePassword />
                <Flex justifyContent={"start"}>
                  <Button
                    size="xs"
                    type="submit"
                    mt="15px"
                    bg="#0058AB"
                    color="white"
                  >
                    Apply Changes
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Flex>
  );
};
