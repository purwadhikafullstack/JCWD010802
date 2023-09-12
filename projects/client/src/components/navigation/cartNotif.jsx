import {
    Button,
    Box,
    Table,
    Tbody,
    Tr,
    Td,
    Text,
    Image,
    VStack,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import { AiOutlineShoppingCart } from 'react-icons/ai';
  import formatIDR from '../../helpers/formatIDR';
import { Link } from 'react-router-dom';
  
  export const CartNotif = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [products, setProducts] = useState([]);
  
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product');
        setProducts(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getProducts();
    }, []);
  
    return (
      <Box
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button bg="transparent" color="white">
          <AiOutlineShoppingCart />
        </Button>
        {isHovered && (
          <Box
            position="absolute"
            top="100%"
            left="-100px"
            zIndex="1"
            backgroundColor="white"
            boxShadow="md"
            p="2"
            as={Link}
            to={"/cart"}
            color="black"
            border="1px solid"
            borderColor="gray.200"
            minW="200px" // Adjust the width as needed
          >
            <Text fontWeight="bold" mb="2">
              Cart ({products.length})
            </Text>
            <VStack align="start" spacing={2}>
              {products.map((item) => (
                <Table key={item.id} size="sm" variant="unstyled">
                  <Tbody>
                    <Tr>
                      <Td>
                        <Image
                          src={`http://localhost:8000/productImg/${item.productImg}`}
                          w="50px" // Adjust the image size as needed
                          h="50px"
                          objectFit="contain"
                        />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{formatIDR(item.price)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    );
  };
  