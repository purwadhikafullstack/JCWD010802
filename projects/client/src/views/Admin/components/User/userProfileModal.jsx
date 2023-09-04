import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Text, UnorderedList, ListItem, Badge } from "@chakra-ui/react";

export const UserProfileModal = ({ user, profile, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
            <ModalOverlay />
            <ModalContent bg={"#edf3f8"} color={"#2d3319"}>
                <ModalHeader color={"#2d3319"}fontWeight={"bold"}>User Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {user && (
                        <Box>
                            <Text fontSize="lg" color={"#2d3319"}fontWeight={"semibold"}>Name : {user.name}</Text>
                            <Text fontSize="lg" color={"#2d3319"}fontWeight={"semibold"}>Email : {user.email}</Text>
                            <Text fontSize="lg" color={"#2d3319"}fontWeight={"semibold"}>Address :</Text>
                            <UnorderedList mt={2}>
                                {profile.map((item, index) => (
                                    <ListItem key={index}color={"#2d3319"}>
                                        <Text color={"#2d3319"}>{item.address.address}, {item.address.kota}, {item.address.provinsi}, {item.address.kode_pos}</Text>
                                        {item.isPrimary &&  
                                        <Badge colorScheme="green" variant={"subtle"} ml={1} color={"green.400"}>
                                        Primary Addres
                                        </Badge>}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}color={"#2d3319"}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
