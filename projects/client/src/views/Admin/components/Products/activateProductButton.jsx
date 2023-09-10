import { Box, Switch } from "@chakra-ui/react";
import axios from "axios";

export const DeactivateProduct = ({ product }) => {
    const deactiveProduct = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/products/${product.id}`);
    }
    catch(error){

    }
  };

  return (
    <Box>
      <Switch
        isChecked={!product.isActive}
        defaultChecked 
        colorScheme={product.isActive ? "red" : "green"}
        onChange={deactiveProduct}
      />
    </Box>
  );
};
