import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { TbFilterCog } from "react-icons/tb";
import { Sorting } from "../SortBy/Sorting";
import { CategorySort } from "../SortBy/CategorySort";
import { MinMaxSort } from "../SortBy/MinMaxPriceSort";
import { useLocation, useNavigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";

export const DrawerSorting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const [reset, setReset] = useState(0);
  const [newMinPrice, setNewMinPrice] = useState("");
  const [newMaxPrice, setNewMaxPrice] = useState("");

  const handleReset = () => {
    navigate(`?`);
    setReset(1);
    setNewMinPrice("");
    setNewMaxPrice("");
  };


  return (
    <>
      <HStack
        onClick={onOpen}
        ref={btnRef}
        cursor={"pointer"}
        display={{ base: "block", md: "none" }}
      >
        <TbFilterCog size={"25px"} />
        <Text fontWeight={"semibold"}>Filter</Text>
      </HStack>
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
              <Text fontWeight={"bold"}>Product :</Text>
              <Sorting />
              <Text fontWeight={"bold"}>Category :</Text>
              <CategorySort />
              <Text fontWeight={"bold"}>Range price :</Text>
              <MinMaxSort reset={reset}/>
              <Button
                rightIcon={<GrPowerReset />}
                colorScheme="red"
                variant="ghost"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
