import {
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
import { useRef } from "react";
import { TbFilterCog } from "react-icons/tb";
import { Sorting } from "../SortBy/Sorting";
import { CategorySort } from "../SortBy/CategorySort";
import { MinMaxSort } from "../SortBy/MinMaxPriceSort";
export const DrawerSorting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
              <MinMaxSort />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
