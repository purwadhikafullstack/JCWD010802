import {
  Avatar,
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Toast,
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import {
  FaRss,
  FaClipboardCheck,
  FaWarehouse,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { PiPackageFill } from "react-icons/pi";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill, BsFillCartFill } from "react-icons/bs";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BiSolidCategoryAlt, BiTransfer } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../../redux/userSlice";
import { setCartOut } from "../../../redux/cartSlice";
import { setPriceOut } from "../../../redux/totalPrice";
import { ModalLogout } from "../../../components/navigation/ModalLogOut";
export const Sidebar = () => {
  const sidebar = useDisclosure();
  const location = useLocation();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("warehouseId");
    dispatch(setLogOut());
    dispatch(setCartOut());
    dispatch(setPriceOut());
    toast({
      title: "Sign Out Success",
      description: "See you next time!",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  const NavItem = (props) => {
    const { icon, children, to, ...rest } = props;
    const isActive = location.pathname === to;

    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        mt={2}
        cursor="pointer"
        color={isActive ? "#9fd8cb" : "#2d3319"}
        _hover={{
          bg: "#2d3319",
          color: "#9fd8cb",
        }}
        bg={isActive ? "#2d3319" : ""}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "#9fd8cb",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#edf3f8"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Box as={Link} to="/">
          <Image
            src="https://i.ibb.co/71gL42Q/TECHTOK-ID-2-removebg-preview.png"
            alt="TECHTOK-ID-2-removebg-preview"
            border="0"
            h="80px"
          />
        </Box>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        aria-label="Main Navigation"
      >
        <NavLink to="">
          <NavItem icon={MdHome} to="/admin">
            Home
          </NavItem>
        </NavLink>
        <NavLink to="order">
          <NavItem icon={PiPackageFill} to="/admin/order">
            Order
          </NavItem>
        </NavLink>
        {user.roleId === 3 ? (
          <>
            <NavLink to="list-user">
              <NavItem icon={FaUsers} to="/admin/list-user">
                User
              </NavItem>
            </NavLink>
            <NavLink to="list-admin">
              <NavItem icon={FaWarehouse} to="/admin/list-admin">
                Warehouse Admin
              </NavItem>
            </NavLink>
            <NavLink to="warehouse">
              <NavItem icon={FaWarehouse} to="/admin/warehouse">
                Warehouse
              </NavItem>
            </NavLink>
          </>
        ) : null}
        <NavLink to="list-category">
          <NavItem icon={BiSolidCategoryAlt} to="/admin/list-category">
            Category
          </NavItem>
          <NavLink to="product-list">
            <NavItem icon={AiFillGift} to="/admin/product-list">
              Products
            </NavItem>
          </NavLink>
          {user.roleId === 3 ? (
            <NavLink to="warehouse-stock">
              <NavItem to="/admin/warehouse-stock" icon={FaClipboardCheck}>
                Stock
              </NavItem>
            </NavLink>
          ) : (
            <NavLink
              to={`warehouse-stock?warehouseId=${user.warehouseAdmin?.warehouseId}`}
            >
              <NavItem
                to={`warehouse-stock?warehouseId=${user.warehouseAdmin?.warehouseId}`}
                icon={FaClipboardCheck}
              >
                Stock
              </NavItem>
            </NavLink>
          )}
          <NavLink to="">
            <NavItem to="/admin/" icon={BsFillCartFill}>
              Order
            </NavItem>
          </NavLink>
          <NavLink to="mutation">
            <NavItem to="/admin/mutation" icon={BiTransfer}>
              Request Stock
            </NavItem>
          </NavLink>
          <NavLink to="product-report">
            <NavItem to="/admin/product-report" icon={HiMiniPresentationChartBar}>
              Product report
            </NavItem>
          </NavLink>
          <NavLink to="sales-report">
            <NavItem to="/admin/sales-report" icon={FaChartLine}>
              Sales report
            </NavItem>
          </NavLink>
          <NavItem icon={BsGearFill}>Settings</NavItem>
        </NavLink>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg="#edf3f8"
      _dark={{
        bg: "#edf3f8",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="#517664"
          _dark={{
            bg: "#517664",
          }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup
            w="96"
            display={{
              base: "none",
              md: "flex",
            }}
          ></InputGroup>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              _active={{ bg: "#517664" }}
              mr="10px"
            >
              <Avatar size="sm" />
            </MenuButton>
            <MenuList color="#517664">
              <MenuItem as={Link} to={"/profile"}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem as={ModalLogout} onLogout={onLogOut}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Box as="main" p="4" bg={"#edf3f8"}>
          <Box
            borderWidth="4px"
            rounded="md"
            h={"fit-content"}
            w={"full"}
            bg={"#d6e5e3"}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
