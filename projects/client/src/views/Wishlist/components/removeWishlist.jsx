import { Button, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import axios from "../../../api/axios";

export const RemoveButton = ({ productId, reload, setReload }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")

  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `/cart/wishlist/${productId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      )
      setReload(!reload)

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Product removed from the wishlist",
          status: "success",
          position:"top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove product from the wishlist",
        status: "error",
        position:"top",

        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Button
    bg={"transparent"}
    _hover={{bg:"transparent"}}
      size="sm"
      color={"red"}
      onClick={handleRemove}
    >
      Remove
    </Button>
  );
};

