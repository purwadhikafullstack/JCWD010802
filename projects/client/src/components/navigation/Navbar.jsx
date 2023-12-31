import { Avatar, Box, Button, Flex, HStack, Icon, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModalLogout } from "./ModalLogOut";
import { setLogOut } from "../../redux/userSlice";
import { setCartOut } from "../../redux/cartSlice";
import { setPriceOut } from "../../redux/totalPrice";
import { CartNotif } from "./cartNotif";
import { WishlistNav } from "./WishlistNav";
import { BiSearchAlt2 } from "react-icons/bi";
import Logo from "../../assets/Navbar/web-logo.png"

export const Navbar = () => {
  const data = useSelector((state) => state.user.value);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const onLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("warehouseId");
    toast({
      title: "Sign Out Success",
      description: "See you next time!",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      dispatch(setLogOut());
      dispatch(setCartOut());
      dispatch(setPriceOut());
      navigate("/login");
    }, 1000);
  };
  const handleSort = (selectedSort) => {
    if (selectedSort === search) {
      navigate(`/product?search=`);
    } else {
      navigate(`/product?search=${selectedSort}`);
    }
    window.scrollTo(0, 0);
  };
  const onClickProduct = () => {
    navigate("/product")
    window.scrollTo(0, 0);
  }
  const onClickHome = () => {
    navigate("/")
    window.scrollTo(0, 0);
  }
  return (
    <Flex
      minW="full"
      h="80px"
      bg="#517664"
      alignItems="center"
      justifyContent="space-between"
      px={{ base: "20px", md: "50px" }}
      py="20px"
      color="white"
      position="fixed"
      zIndex={999}
    >
      <HStack spacing={3} mr={1} display={{ base: "none", lg: "flex" }}>
        <Box onClick={onClickHome} >
          <Image src={Logo} h="140px" />
        </Box>
        <Button
          variant="ghost"
          color="white"
          onClick={onClickProduct}
          _hover={{ color: "#517664", bg: "white" }}
        >
          Products
        </Button>
      </HStack>
      <InputGroup maxW="500px">
        <InputLeftElement color="gray.500">
          <Icon as={BiSearchAlt2} boxSize={5} />
        </InputLeftElement>
        <Input
          maxW="500px"
          h="40px"
          bg="white"
          color="#517664"
          placeholder="Find your desired items"
          onChange={(e) => handleSort(e.target.value)}
        />
      </InputGroup>
      <Flex gap={3} align="center" display={{ base: "none", lg: "flex" }}>
        {data?.roleId === 2 || data?.roleId === 3 ? null :
        <NavLink to={"cart"}>
          <CartNotif/>
        </NavLink>
        }
        {data?.roleId === 2 || data?.roleId === 3 ? null :
        <Text>|</Text>
        }
        
        {!data?.name ? (
          <Flex align="center">
            <Button
              variant="ghost"
              color="white"
              as={Link}
              to="/login"
              _hover={{ color: "#517664", bg: "white" }}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              color="white"
              as={Link}
              to="/register"
              _hover={{ color: "#517664", bg: "white" }}
            >
              Register
            </Button>
          </Flex>
        ) : (
          <Flex align="center" justifyContent="center" gap={3}>
            {data?.roleId === 2 || data?.roleId === 3 ? null :
            <NavLink to="wishlist">
              <WishlistNav />
            </NavLink>
            }
            {data?.roleId === 1?
            <Menu>
              <MenuButton as={Button} variant="ghost" _active={{ bg: "#517664"}} mr="10px">
                <Avatar src={`${process.env.REACT_APP_BASE_URL}/profileImg/${data?.profileImg}`} size="sm" />
              </MenuButton>
              <MenuList color="#517664">
                <MenuItem as={Link} to={"/profile"}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem as={ModalLogout} onLogout={onLogOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu> :
            <Menu>
              <MenuButton as={Button} variant="ghost" _active={{ bg: "#517664"}} mr="10px" _hover={{ bg: " #517664"}}>
                <Avatar size="sm" src={`${process.env.REACT_APP_BASE_URL}/profileImg/${data?.profileImg}`}/>
              </MenuButton>
              <MenuList color="#517664">
                <NavLink to={"/profile"}>
                  <MenuItem>Profile</MenuItem>
                </NavLink>
                <NavLink to={"/admin"}>
                  <MenuItem>Admin</MenuItem>
                </NavLink>
                <MenuDivider />
                <MenuItem as={ModalLogout} onLogout={onLogOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          }  
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
