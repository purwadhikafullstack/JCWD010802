import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const CategorySort = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const category = params.get("category") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const currentPage = Number(params.get("page")) || 1;
  const navigate = useNavigate();
  const [categories, setCategories] = useState()

  const getCategory = async () => {
    try {
        const response = await axios.get(
          `http://localhost:8000/api/category/`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        setCategories(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getCategory();
    }, []);

  const handleSort = (selectedSort) => {
      navigate(`?search=${search}&sort=${sort}&category=${selectedSort}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}`);
  };

  return (
    <Select
      placeholder="Select option"
      defaultValue={category}
      value={category}
      onChange={(e) => handleSort(e.target.value)}
      variant="filled"
    >
        {categories?.map((item,index) => (
            <option value={item.id}>{item.name}</option>
        ))}
    </Select>
  );
};
