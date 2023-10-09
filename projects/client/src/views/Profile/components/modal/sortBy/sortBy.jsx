import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";

export const Sort = ({ setSort, sort }) => {

  const handleSort = (selectedSort) => {
    setSort(selectedSort)
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        Sort
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue={sort || "asc"} title="Sort by :" type="radio">
          <MenuItemOption
            value="asc"
            onClick={() => handleSort("asc")} // Menyebabkan ascending saat dipilih
          >
            Ascending
          </MenuItemOption>
          <MenuItemOption
            value="desc"
            onClick={() => handleSort("desc")} // Menyebabkan descending saat dipilih
          >
            Descending
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
