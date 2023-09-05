import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const Sort = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const navigate = useNavigate();

  const handleSort = (selectedSort) => {
    if (selectedSort === sort) {
      // Jika pilihan yang dipilih adalah yang sudah aktif, kosongkan parameter "sort"
      navigate(`?search=${search}&sort=`);
    } else {
      navigate(`?search=${search}&sort=${selectedSort}`);
    }
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
