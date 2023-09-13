import React from "react";
import { Icon, Select } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const SortCategory = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const navigate = useNavigate();

  const handleSort = (selectedSort) => {
    navigate(`?search=${search}&sort=${selectedSort}`);
  };

  return (
    <Select
      placeholder="Sort option"
      defaultValue={sort}
      onChange={(e) => handleSort(e.target.value)}
      variant="filled"
    >
      <option value="asc">A-Z</option>
      <Icon />
      <option value="desc">Z-A</option>
    </Select>
  );
};
