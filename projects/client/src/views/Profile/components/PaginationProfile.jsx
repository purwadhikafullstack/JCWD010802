import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtomTemp } from "../../../components/pagination/button";

export const PaginationProfile = ({ totalpage, currentpage, setPage }) => {

  function handlePage(newPage) {
    if (newPage >= 1 && newPage <= totalpage) {
      setPage(newPage)
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
