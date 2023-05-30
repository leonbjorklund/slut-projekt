import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import ShoppingCart from "../components/ShoppingCart";
import { useAccount } from "../context/accountContext";
import { useCart } from "../context/cartContext";

function Checkout() {
  const { cart } = useCart();
  const { user } = useAccount();

  if (cart.length === 0) {
    return (
      <Center>
        <Flex flexDir='column' py={24} alignItems='center'>
          <Heading size='md' p='4' textTransform='uppercase'>
            Oh no..
          </Heading>
          <Text>..your cart is empty.</Text>
          <Text>
            But don't fear, we have tons of vases that would love it here.
          </Text>
          <Link to='/'>
            <Button
              variant='outline'
              colorScheme='yellow'
              borderColor='yellow.400'
              color='black'
              borderRadius='none'
              borderWidth='1px'
              mt={8}
              height='45px'
              _hover={{ bg: "orange.100" }}
            >
              Start shopping
            </Button>
          </Link>
        </Flex>
      </Center>
    );
  }

  return (
    <>
      <ShoppingCart />
      <Center>
        <Heading as='h3' size='md' p={4} textTransform='uppercase'>
          Your information:
        </Heading>
      </Center>
      {user ? (
        <CustomerForm />
      ) : (
        <Center>
          <Link to='/login'>
            <Button
              bg='none'
              _hover={{ bg: "none", textDecoration: "underline" }}
            >
              Please log in to complete your order
            </Button>
          </Link>
        </Center>
      )}
    </>
  );
}

export default Checkout;
