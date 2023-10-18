import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { SortCategory } from "../sort/sortCategory";

export const DrawerSortingCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={onOpen}
        ref={btnRef}
        cursor={"pointer"}
        display={{ base: "block", md: "none" }}
      >
        <GiHamburgerMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            colorScheme="red"
            _hover={{ backgroundColor: "red", color: "white" }}
          />
          <DrawerHeader>Filter by</DrawerHeader>
          <DrawerBody>
            <Stack spacing={3} px={"10px"}>
              <Text fontWeight={"bold"}>Alphabetically :</Text>
              <SortCategory />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
