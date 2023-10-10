import { Button, Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import copyToClipboard from "../../../helpers/copyToClipboard"
import { ToastContainer, toast } from "react-toastify";
import { FaHeart, FaShare } from 'react-icons/fa'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

export const CartFooter = ({copylink, productId}) => {
    
  const data = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

    const handleCopyLink = async () => {
        try {
          await navigator.clipboard.writeText(copylink);
          toast.success('Link copied to clipboard!');
        } catch (err) {
          console.error('Unable to copy link: ', err);
        }
      };
      const handleAddToWishlist = async () => {
        try {
          if (data.isVerified) {
            const response = await axios.post(
              `/cart/wishlist/${productId}`, 
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            toast.success('Product added to wishlist', { position: 'top-center' });
          } else {
            toast.error('You are not verified. Verify your account to access more features.', {
              position: toast.POSITION.TOP_CENTER,
            });

            setTimeout(() => {
              navigate('/login');
            }, 2500);
          }
        } catch (error) {

          console.log(error);
          if (error) {
            toast.error(error.response.data.message,{ position: 'top-center'
          })
          } else {
            toast.error("Failed to add product to wishlist");
          }
        }
      };
    
    return(
        <>
        <Divider mt={2}/>
        <HStack h={"30px"} mx={3} justifyContent={"space-between"} mt={2}>
        <Button bg={"transparent"} leftIcon={<FaHeart color="517664" />} onClick={handleAddToWishlist}gap={2}>
          Wishlist
        </Button>
        <Divider orientation="vertical" />
        <Button bg={"transparent"} leftIcon={<FaShare color="517664" />} gap={2} onClick={handleCopyLink}>
          Share Link
        </Button>
        </HStack>
        <ToastContainer autoClose={1000} hideProgressBar={true}/>
        </>
    )
}