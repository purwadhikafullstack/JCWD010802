import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsSearch, BsTrash3 } from "react-icons/bs";

export const Filtering = ({
  search,
  warehouse,
  warehouseId,
  monthly,
  handleSearch,
  handleWarehouseChange,
  handleMonthly,
  handleReset,
}) => {
  const user = useSelector((state) => state.user.value);

  return (
    <Flex gap={5} maxW={"100vw"} alignItems={"center"}>
      <Flex maxW={"50vw"} gap={5} mt={6}>
        <InputGroup>
          <Input
            variant="outline"
            placeholder="Search"
            _placeholder={{ color: "black" }}
            value={search}
            type={"search"}
            color={"black"}
            onChange={handleSearch}
            borderColor={"2px solid black"}
          />
          <InputLeftElement>
            <Icon as={BsSearch} color={"gray.500"} />
          </InputLeftElement>
        </InputGroup>
        {user.roleId === 3 ? (
          <Select
            id="warehouseSelect"
            value={warehouseId}
            onChange={handleWarehouseChange}
            maxWidth="200px"
            borderColor={"2px solid black"}
          >
            <option value="">Select a warehouse</option>
            {warehouse?.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </Select>
        ) : null}
        <Flex maxW={"30vw"}>
          <Input
            type="month"
            value={monthly}
            onChange={handleMonthly}
            borderColor={"2px solid black"}
          ></Input>
        </Flex>
        <Flex maxW={"30vw"}>
          <Button
            w={"full"}
            rightIcon={<BsTrash3 />}
            colorScheme="red"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
