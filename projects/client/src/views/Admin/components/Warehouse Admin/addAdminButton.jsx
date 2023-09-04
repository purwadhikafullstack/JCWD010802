import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { AddAdmin } from './addAdmin';
import axios from 'axios';
import { color } from 'framer-motion';

export const AddAdminButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal} bg={"#517664"} m={2}color={'white'} _hover={{bg:"#2d3319"}}>+ Add New Admin</Button>
      <AddAdmin isOpen={isOpen} onClose={closeModal}  />
    </div>
  );
};

