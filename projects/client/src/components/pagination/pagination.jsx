import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtomTemp } from "./button";

export const Pagination = ({ totalpage }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const category = params.get("category") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const currentpage = Number(params.get("page")) || 1;

  function handlePage(newPage) {
    if (newPage >= 1 && newPage <= totalpage) {
      params.set("page", newPage);
      navigate(`?search=${search}&sort=${sort}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${newPage}`);
    }
  }
  return (
    <Flex gap={3} alignItems={"center"} justifyContent={"center"} mt={5}>
      <ButtomTemp
        isDisabled={currentpage === 1}
        content={<Icon as={FaArrowAltCircleLeft} w="5" h="5" />}
        func={() => handlePage(currentpage - 1)}
        />
      <Text fontWeight={"medium"} color={"black"}>
        {" "}
        Page {currentpage} of {totalpage}{" "}
      </Text>
      <ButtomTemp
        isDisabled={currentpage === totalpage || totalpage === 0}
        content={<Icon as={FaArrowAltCircleRight} w="5" h="5" />}
        func={() => handlePage(currentpage + 1)}
      />
    </Flex>
  );
};
