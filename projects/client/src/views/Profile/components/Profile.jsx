import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { InputField } from "../../../components/input/InputField";
import { Form, Formik } from "formik";
import { ChangeImage } from "./modal/modalProfile/modalImage";
import { ChangePassword } from "./modal/modalProfile/modalPassword";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import headersGen from "../../../api/headers";
import axios from "../../../api/axios";
import { setLogOut } from "../../../redux/userSlice";
import { setCartOut } from "../../../redux/cartSlice";
import { setPriceOut } from "../../../redux/totalPrice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProfileCard = () => {
  const profile = useSelector((state) => state.user.value);
  const [image, setImage] = useState();
  const [reload, setReload] = useState(0);
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
  });
  const getImage = async () => {
    try {
      const response = await axios.get(`/user`, { headers });
      setImage(response.data.result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load image!");
    }
  };
  const EditProfile = async (data) => {
    try {
      await axios.patch(`/user/edit`, data, { headers });
      toast.success("Profile updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Error to updating profile", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.log(error);
    }
  };
  const onLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("warehouseId");
    toast({
      title: "Sign Out Success",
      description: "See you next time!",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      dispatch(setLogOut());
      dispatch(setCartOut());
      dispatch(setPriceOut());
      navigate("/login");
    }, 1500);
  };
  const triggerReload = () => {
    setReload(!reload);
  };
  useEffect(() => {
    getImage();
  }, [reload]);
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
            {image?.map((item) => (
              <Box>
                <Avatar
                  size="2xl"
                  src={`${process.env.REACT_APP_BASE_URL}/profileImg/${item.profileImg}`}
                  name={profile.name}
                />
              </Box>
            ))}
            <ChangeImage reload={triggerReload} />
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
        w={"full"}
        bgColor={"whiteAlpha.700"}
      >
        <Box>
          <Formik
            initialValues={{
              name: profile.name,
              email: profile.email,
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
                  w={"full"}
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
                  w={"full"}
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
      <ToastContainer />
      <Button
        w="full"
        color="white"
        bg="red"
        mt="20px"
        display={{ base: "block", lg: "none" }}
        onClick={onLogOut}
      >
        Logout
      </Button>
    </Flex>
  );
};
