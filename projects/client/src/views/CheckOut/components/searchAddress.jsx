import React from "react";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export const SearchAddress = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const currentPage = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const handleSearch = (result) => {
    navigate(`?search=${result.target.value}&page=${currentPage}`);
  };
  return (
    <InputGroup>
      <Input
        variant="outline"
        placeholder="Search"
        _placeholder={{ color: "black" }}
        defaultValue={search}
        type={"search"}
        color={"black"}
        onChange={handleSearch}
        borderColor={"2px solid black"}
      />
      <InputLeftElement>
        <Icon as={BsSearch} color={"gray.500"} />
      </InputLeftElement>
    </InputGroup>
  );
};
