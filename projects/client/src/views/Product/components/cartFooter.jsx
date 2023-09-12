import { Button, Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import copyToClipboard from "../../../helpers/copyToClipboard"
import { ToastContainer, toast } from "react-toastify";
import { FaHeart, FaShare } from 'react-icons/fa'
export const CartFooter = ({copylink}) => {
    console.log(copylink);
    const handleCopyLink = async () => {
        try {
          await navigator.clipboard.writeText(copylink);
          toast.success('Link copied to clipboard!');
        } catch (err) {
          console.error('Unable to copy link: ', err);
        }
      };
    
    return(
        <>
        <Divider mt={2}/>
        <HStack h={"30px"} mx={3} justifyContent={"space-between"} mt={2}>
        <Button bg={"transparent"} leftIcon={<FaHeart color="517664" />} spacing={2}>
          Wishlist
        </Button>
        <Divider orientation="vertical" />
        <Button bg={"transparent"} leftIcon={<FaShare color="517664" />} spacing={2} onClick={handleCopyLink}>
          Share Link
        </Button>
        </HStack>
        <ToastContainer autoClose={1000} hideProgressBar={true}/>
        </>
    )
}