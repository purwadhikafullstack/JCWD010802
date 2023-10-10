import React from "react";
import { Select } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const Sorting = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const category = params.get("category") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const currentPage = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const handleSort = (selectedSort) => {
    navigate(
      `?search=${search}&sort=${selectedSort}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}`
    );
  };

  return (
    <Select
      placeholder="Select option"
      defaultValue={sort}
      value={sort}
      onChange={(e) => handleSort(e.target.value)}
      variant="filled"
    >
      <option value="az">Oldest</option>
      <option value="za">Newest</option>
      <option value="lowest">Lowest</option>
      <option value="highest">Highest</option>
    </Select>
  );
};
