import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAccount } from "../context/accountContext";

function DropdownMenu() {
  const { user } = useAccount();

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg='none'
        _hover={{ bg: "none", textDecoration: "underline" }}
        _focus={{ outline: "none", boxShadow: "none" }}
      >
        <Icon boxSize={7} as={IoPersonOutline} />
      </MenuButton>
      <MenuList
        borderWidth='1px'
        borderColor='gray.400'
        borderRadius='none'
        p={2}
        fontSize='md'
      >
        <MenuItem
          as={Link}
          to='/orders'
          _hover={{ borderBottom: "1px solid black", bg: "transparent" }}
        >
          My orders
        </MenuItem>
        {user && user.isAdmin && (
          <>
            <MenuItem
              as={Link}
              to='/admin/users'
              _hover={{ borderBottom: "1px solid black", bg: "transparent" }}
            >
              Settings users
            </MenuItem>
            <MenuItem
              as={Link}
              to='/admin/orders/settings'
              _hover={{ borderBottom: "1px solid black", bg: "transparent" }}
            >
              Settings orders
            </MenuItem>
            <MenuItem
              as={Link}
              to='/admin'
              _hover={{ borderBottom: "1px solid black", bg: "transparent" }}
            >
              Settings products
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

export default DropdownMenu;
