import { Flex, Icon } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";


export const NavitemMobile = (props) => {
    const location = useLocation();
    const { icon, children, to, ...rest } = props;
    const isActive = location.pathname === to;

    return (
    <Flex align="center" cursor="pointer" color="black" role="group" 
    fontWeight={isActive ? "bold" : "normal"} transition=".15s ease"
    direction="column" {...rest}
    >
        {icon && (
          <Icon boxSize="4" as={icon}/>
        )}
        {children}
    </Flex>
    )
}