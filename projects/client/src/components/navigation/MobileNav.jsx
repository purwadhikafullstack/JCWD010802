import { Flex, Text } from "@chakra-ui/react"
import { AiOutlineAppstore, AiOutlineShoppingCart } from "react-icons/ai"
import { BiHomeAlt, BiUserCircle } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { NavitemMobile } from "./NavitemMobile"
import { useSelector } from "react-redux"
import { FaUserShield } from "react-icons/fa"


export const MobileNav = () => {
    const data = useSelector((state) => state.user.value);
    return (
        <Flex justifyContent="space-evenly" align="center" display={{ base: "flex", lg: "none"}}
        position="fixed" bottom="0" w="full" h="30px" bg="#cacfd6" py="30px">
            <NavLink to="">
                <NavitemMobile icon={BiHomeAlt} to="/">Home</NavitemMobile>
            </NavLink>
            <NavLink to="product">
                <NavitemMobile icon={AiOutlineAppstore} to="/product">Product</NavitemMobile>
            </NavLink>
            <NavLink to="cart">
                <NavitemMobile icon={AiOutlineShoppingCart} to="/cart">Cart</NavitemMobile>
            </NavLink>
            {data.roleId === 1 ? 
            <NavLink to="profile">
                <NavitemMobile icon={BiUserCircle} to="/profile">Profile</NavitemMobile>
            </NavLink> : 
            <>
            <NavLink to="profile">
                <NavitemMobile icon={BiUserCircle} to="/profile">Profile</NavitemMobile>
            </NavLink>
            <NavLink to="admin">
                <NavitemMobile icon={FaUserShield} to="/admin">Admin</NavitemMobile>
            </NavLink>
            </>}
        </Flex>
    )
}