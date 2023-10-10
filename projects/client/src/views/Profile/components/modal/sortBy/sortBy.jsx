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
            onClick={() => handleSort("asc")}
          >
            Newest address
          </MenuItemOption>
          <MenuItemOption
            value="desc"
            onClick={() => handleSort("desc")}
          >
            Oldest address
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
