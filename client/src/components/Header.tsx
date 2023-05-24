import { Badge, Box, Button, Flex, Icon, Image } from "@chakra-ui/react";
import { IoBagOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { useAccount } from "../context/accountContext";
import { useCart } from "../context/cartContext";
import DropdownMenu from "./DropdownMenu";

function Header() {
  const { cart } = useCart();
  const { user, signout } = useAccount();

  // Calculate total quantity of items in cart

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Flex
      justifyContent='flex-end'
      alignItems='center'
      width='100%'
      as='header'
      px={8}
      height={24}
      borderBottom='1px'
      borderColor='blackAlpha.200'
      bg='brand.100'
      position='fixed'
      zIndex='sticky'
    >
      <Box
        position='absolute'
        left={{ base: "15%", md: "50%" }}
        transform='translateX(-50%)'
      >
        <Link to='/'>
          <Image
            src='/logo.svg'
            maxWidth={{ base: "120px", md: "150px" }}
            maxHeight='100%'
          />
        </Link>
      </Box>
      <Flex alignItems='center' justifyContent='space-between'>
        {user ? (
          <Button
            bg='none'
            _hover={{ bg: "none", textDecoration: "underline" }}
            onClick={() => signout()}
          >
            Sign Out
          </Button>
        ) : (
          <Link to='/login'>
            <Button
              bg='none'
              _hover={{ bg: "none", textDecoration: "underline" }}
            >
              Log in
            </Button>
          </Link>
        )}
        {user && (
          <Box pr={{ base: 1, md: 4 }}>
            <DropdownMenu />
          </Box>
        )}
        <Box pos='relative' mr={{ base: 0, md: 4 }}>
          <Link to='checkout' data-cy='cart-link'>
            <Icon boxSize={7} as={IoBagOutline} />
            {totalQuantity > 0 && (
              <Badge
                position='absolute'
                top='-10px'
                right='-6px'
                colorScheme='yellow'
                bg='yellow.400'
                fontSize='0.85rem'
                borderRadius='10px'
                data-cy='cart-items-count-badge'
              >
                {totalQuantity}
              </Badge>
            )}
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;
