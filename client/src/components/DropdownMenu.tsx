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
        _active={{ bg: "none" }}
      >
        <Icon boxSize={7} as={IoPersonOutline} />
      </MenuButton>
      <MenuList
        borderWidth='1px'
        borderColor='yellow.400'
        borderRadius='none'
        p={2}
        fontSize='md'
        bg='brand.100'
      >
        <MenuItem
          as={Link}
          to='/orders'
          bg='brand.100'
          _hover={{
            borderBottom: "1px solid black",
            bg: "transparent",
            fontWeight: "bold",
          }}
        >
          My orders
        </MenuItem>
        {user && user.isAdmin && (
          <>
            <MenuItem
              as={Link}
              to='/admin/users'
              bg='brand.100'
              _hover={{
                borderBottom: "1px solid black",
                bg: "transparent",
                fontWeight: "bold",
              }}
            >
              Settings users
            </MenuItem>
            <MenuItem
              as={Link}
              to='/admin/orders/settings'
              bg='brand.100'
              _hover={{
                borderBottom: "1px solid black",
                bg: "transparent",
                fontWeight: "bold",
              }}
            >
              Settings orders
            </MenuItem>
            <MenuItem
              as={Link}
              to='/admin'
              bg='brand.100'
              _hover={{
                borderBottom: "1px solid black",
                bg: "transparent",
                fontWeight: "bold",
              }}
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
