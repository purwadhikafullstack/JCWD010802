import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtomTemp } from "./button";

export const PaginationAddress = ({ totalpage }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const roleId = params.get("roleId") || "";
  const warehouseId = params.get("warehouseId") || "";
  const currentpage = Number(params.get("page")) || 1;
  const monthly = params.get("monthly") || "";


  function handlePage(newPage) {
    if (newPage >= 1 && newPage <= totalpage) {
      params.set("page", newPage);
      navigate(`?search=${search}&sort=${sort}&roleId=${roleId}&warehouseId=${warehouseId}&monthly=${monthly}&page=${newPage}`);
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