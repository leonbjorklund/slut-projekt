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

function DropdownMenu() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg='none'
        _hover={{ bg: "none", textDecoration: "underline" }}
      >
        <Icon boxSize={7} as={IoPersonOutline} />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to='/admin/orders'>
          My orders
        </MenuItem>
        <MenuItem as={Link} to='/admin/users'>
          Settings users
        </MenuItem>
        <MenuItem as={Link} to='/admin/orders/settings'>
          Settings orders
        </MenuItem>
        <MenuItem as={Link} to='/admin'>
          Settings products
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default DropdownMenu;
