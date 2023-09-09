import { Avatar, Button, Flex, HStack, Heading, Image, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, Text, useToast } from "@chakra-ui/react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { ModalLogout } from "./ModalLogOut"
import { setLogOut } from "../../redux/userSlice"
import { AiFillHeart } from "react-icons/ai"


export const Navbar = () => {
    const data = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()

    const onLogOut = () => {
        localStorage.removeItem("token")
        dispatch(setLogOut())
        toast({
            title: "Sign Out Success",
            description: "See you next time!",
            status: 'success',
            duration: 1200,
            isClosable: true,
            position: "top"
          })
        setTimeout(() => {
            navigate("/login")
        }, 1500)
    }
    return (
        <Flex minW="full" h="80px" bg="#517664" alignItems="center" 
        justifyContent="space-between" px={{base: "20px", md: "50px"}} py="20px" color="white"
        position="fixed" zIndex={999}>
            <HStack spacing={3} mr={1} display={{ base: "none", lg: "flex"}}>
                <Image src="https://i.postimg.cc/rs836p0m/web-logo.png" h="140px" />
                <Button variant="ghost" color="white" as={Link} to="/product"
                _hover={{ color: "#517664", bg: "white"}}>
                    Products
                </Button>
            </HStack>
            <Input maxW="500px" h="40px" bg="white" color="#517664" placeholder="Find your desired items" />
            <HStack  spacing={3} display={{ base: "none", lg: "flex"}}>
                <Button variant="ghost" color="white" as={Link} to="/cart"
                _hover={{ color: "#517664", bg: "white"}}>
                    <AiOutlineShoppingCart />
                </Button>
                <Text>|</Text>
                {!data.name ? 
                <Flex align="center">
                    <Button variant="ghost" color="white" as={Link} to="/login"
                    _hover={{ color: "#517664", bg: "white"}}>
                        Sign In
                    </Button>
                    <Button variant="ghost" color="white" as={Link} to="/register"
                    _hover={{ color: "#517664", bg: "white"}}>
                        Register
                    </Button> 
                </Flex> : 
                <Flex align="center" justifyContent="center">
                    <Button variant="ghost" color="white" _hover={{ color: "#517664", bg: "white"}}>
                        <AiFillHeart />
                    </Button>
                    {data.roleId === 1?
                    <Menu>
                        <MenuButton as={Button} variant="ghost" _active={{ bg: "#517664"}} mr="10px">
                            <Avatar size="sm" />
                        </MenuButton>
                        <MenuList color="#517664">
                            <MenuItem>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem as={ModalLogout} onLogout={onLogOut}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu> :
                    <Menu>
                    <MenuButton as={Button} variant="ghost" _active={{ bg: "#517664"}} mr="10px">
                        <Avatar size="sm" />
                    </MenuButton>
                    <MenuList color="#517664">
                        <MenuItem>Profile</MenuItem>
                        <NavLink to={"/admin"}>
                        <MenuItem>Admin</MenuItem>
                        </NavLink>
                        <MenuDivider />
                        <MenuItem as={ModalLogout} onLogout={onLogOut}>Sign Out</MenuItem>
                    </MenuList>
                </Menu>
                    }  
                </Flex> 
                }
            </HStack>
        </Flex>
    )
}