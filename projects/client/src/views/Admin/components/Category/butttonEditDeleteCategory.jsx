import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  Box,
  color,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ModalEditCategory } from "./modal/modalEditCategory";
import { ModalDeleteCategory } from "./modal/modalDeleteCategory";

export const ButtonOptionCategory = ({ id, name, image, reload, setReload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <Box>
      <Flex justifyContent="center" alignItems="flex-start">
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<BsThreeDotsVertical color="black"/>}
              variant="solid"
              w="fit-content"
              size="xs"
              color="white"
            />
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Button
                  variant="ghost"
                  rightIcon={<BiEditAlt />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<RiDeleteBin6Line />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  colorScheme="red"
                  fontSize="sm"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <ModalEditCategory
        id={id}
        name={name}
        image={image}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reload={reload}
        setReload={setReload}
      />
      <ModalDeleteCategory
        id={id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteClick={handleDeleteClick}
        reload={reload}
        setReload={setReload}
      />
    </Box>
  );
};
