import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Button,
} from "@chakra-ui/react";
import { FaChevronUp } from "react-icons/fa";

export const AdminMenu = ({ index, toggleMenu, handleMenuItemClick, warehouse }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    toggleMenu(index);
  };

  return (
    <Menu isOpen={isOpen} placement="top" >
      <MenuButton
        as={Button}
        rightIcon={<FaChevronUp style={{ fontSize: "8px" }} />}
        bg="transparent"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ color: "#9fd8cb" }}
        _active={{ bg: "transparent" }}
      >
        Change Warehouse
      </MenuButton>
      {isOpen && (
        <Portal>
          <MenuList >
            {warehouse.map((warehouseItem) => (
              <MenuItem
                key={warehouseItem.id}
                onClick={() =>{
                    handleMenuItemClick(index, warehouseItem.name, warehouseItem.id)
                    closeMenu()
                }
                }
              >
                {warehouseItem.name}
              </MenuItem>
            ))}
          </MenuList>
        </Portal>
      )}
    </Menu>
  );
};

