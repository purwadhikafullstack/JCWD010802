import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeImage } from "./modal/modalProfile/modalImage";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import headersGen from "../../../api/headers";
import axios from "../../../api/axios";
import { setLogOut } from "../../../redux/userSlice";
import { setCartOut } from "../../../redux/cartSlice";
import { setPriceOut } from "../../../redux/totalPrice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonOptionProfile } from "./ButonOptionProfile";

export const ProfileCard = () => {
  const profile = useSelector((state) => state.user.value);
  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [reload, setReload] = useState(0);
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDetailUser = async () => {
    try {
      const response = await axios.get(`/user`, { headers });
      setImage(response.data.result);
      setBio(response.data.result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load image!");
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
    getDetailUser();
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

      {bio?.map((item) => (
        <Flex
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          display="flex"
          ml={{ base: "0", lg: 50 }}
          w={"full"}
          bgColor={"whiteAlpha.700"}
          justifyContent={"space-between"}
        >
          <Box>
            <Heading fontSize="lg" mb={2}>
              Name :
            </Heading>
            <Input variant="flushed" value={item.name} />
            <Heading fontSize="lg" mt={4} mb={2}>
              Email :
            </Heading>
            <Input variant="flushed" value={item.email} />
            <Heading fontSize="lg" mt={4} mb={2}>
              Created At :
            </Heading>
            <Input
              variant="flushed"
              value={new Date(item.createdAt).toLocaleDateString()}
            />
          </Box>

          <Box>
            <ButtonOptionProfile
              id={item.id}
              name={item.name}
              email={item.email}
              reload={triggerReload}
            />
          </Box>
        </Flex>
      ))}
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
