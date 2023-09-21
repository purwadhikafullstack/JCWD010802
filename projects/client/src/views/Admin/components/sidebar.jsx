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
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { FaRss, FaClipboardCheck, FaWarehouse, FaUsers } from "react-icons/fa";
import { HiCollection, HiCode } from "react-icons/hi";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
export const Sidebar = () => {
  const sidebar = useDisclosure();
  const location = useLocation();

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
        <Text fontSize="2xl" ml="2" color="#2d3319" fontWeight="semibold">
          BBB
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        gap={2}
        fontSize="sm"
        aria-label="Main Navigation"
      >
        <NavLink to="/">
          <NavItem icon={MdHome} to="/">
            Home
          </NavItem>
        </NavLink>
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
        <NavLink to="list-category">
          <NavItem icon={BiSolidCategoryAlt} to="/admin/list-category">
            Category
          </NavItem>
          <NavLink to="warehouse">
            <NavItem icon={FaWarehouse} to="/admin/warehouse">
              Warehouse
            </NavItem>
          </NavLink>
          <NavLink to="product-list">
            <NavItem icon={AiFillGift} to="/admin/product-list">
              Products
            </NavItem>
          </NavLink>
          <NavLink to="warehouse-stock">
            <NavItem to="/admin/warehouse-stock" icon={FaClipboardCheck}>
              Stock
            </NavItem>
          </NavLink>
          <NavLink to="report">
            <NavItem icon={HiCode}>Report</NavItem>
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

          <Flex align="center">
            <Icon color="white" as={FiBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
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
