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
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { ModalEditProfile } from "./modal/modalProfile/modalEditProfile";
import { ChangePassword } from "./modal/modalProfile/modalPassword";

export const ButtonOptionProfile = ({ id, name, email, reload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleChangePassword = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <Box>
      <Flex justifyContent="center" alignItems="flex-start">
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<FiSettings color="black"/>}
              variant="ghost"
              w="fit-content"
              size="lg"
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
                  colorScheme="blue"
                >
                  Edit profile
                </Button>
                <Button
                  variant="ghost"
                  rightIcon={<RiLockPasswordFill />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={handleChangePassword}
                  colorScheme="green"
                >
                  Change password
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <ModalEditProfile
        id={id}
        name={name}
        email={email}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reload={reload}
      />
      <ChangePassword
        id={id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteClick={handleChangePassword}
        reload={reload}
      />
    </Box>
  );
};
