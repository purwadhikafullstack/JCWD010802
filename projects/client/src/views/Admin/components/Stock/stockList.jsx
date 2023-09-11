import { Box, Button, Card, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ManageProduct } from "./ManageProduct";

export const StockList = ({ data, triggerReload }) => {
    const [isOpen, setIsOpen] = useState({});
    
    const handleOpenModal = (itemId) => {
        setIsOpen({ ...isOpen, [itemId]: true });
    }

    const handleCloseModal = (itemId) => {
        setIsOpen({ ...isOpen, [itemId]: false });
    }

    return (
        <>
            {data?.map((item) => (
                <Card
                    key={item.id}
                    p={4}
                    width={["100%", "100%", "100%", "100%"]} 
                    shadow="md"
                    borderWidth="1px"
                    mx={"auto"}
                    position="relative"
                    display="flex"
                    flexDirection="column"
                >
                    <Flex alignItems="center">
                        <Image
                            objectFit="cover"
                            src={`http://localhost:8000/productImg/${item.product.productImg}`}
                            alt="#"
                            boxSize="100px" 
                        />
                        <Box ml={4} w="full">
                            <Flex justifyContent="space-between" w="full" align="center">
                                <Heading fontSize="20px">
                                    {item.product.name}
                                </Heading>
                                <Button variant="ghost" onClick={() => handleOpenModal(item.id)}>
                                    Manage Stock
                                </Button>
                            </Flex>
                            <Text color="gray.500">
                                Stock: {item.quantity}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex>
                    </Flex>
                    <ManageProduct isOpen={isOpen[item.id]} onClose={() => handleCloseModal(item.id)} data={item} />
                </Card>
            ))}
        </>
    );
};
