import { Badge, Box, Button, Flex, Icon, Image } from "@chakra-ui/react";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

function Header() {
  const { cart } = useCart();

  function handleLogout() {
    fetch("http://localhost:3000/api/users/signout", {
      method: "POST",
      credentials: "include",
    });
  }

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
        <Box pr={{ base: 1, md: 4 }}>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        </Box>
        <Button onClick={() => handleLogout()}>Sign Out</Button>
        <Box pr={{ base: 1, md: 4 }}>
          <Link data-cy='admin-link' to='admin'>
            <Icon boxSize={7} as={IoPersonOutline} />
          </Link>
        </Box>

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
