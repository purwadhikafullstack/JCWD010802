import {
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const CheckoutList = () => {
  return (
    <Flex direction={"column"}>
      <Flex >
        <Image
          src="https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_pro_deep_purple_3_9.jpg"
          maxW={{ base: "50px", sm: "100px" }}
          objectFit="cover"
        />
        <Stack>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Name
          </Text>
          <Text fontWeight={"light"}>Weight</Text>
          <Text fontWeight={"semibold"}>Price</Text>
        </Stack>
      </Flex>
      <Divider borderWidth={2} my={3} marginTop={5} />

      <CheckboxGroup colorScheme="green" defaultValue={["2000"]}>
        <Stack spacing={[1, 5]} direction={["column", "row"]} justifyContent={"flex-start"}>
          <Checkbox value="2000">Shipping insurance</Checkbox>
          <Checkbox value="1500">Protection discount</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Divider borderWidth={2} my={3} marginTop={5} />
      <Flex justifyContent={"space-between"}>
        <Text fontWeight={"bold"} fontSize={{ base: "15px", lg: "25px" }}>
          Subtotal :
        </Text>
        <Text fontWeight={"bold"} fontSize={{ base: "15px", lg: "25px" }}>
          Rp. 1.000
        </Text>
      </Flex>
    </Flex>
  );
};
