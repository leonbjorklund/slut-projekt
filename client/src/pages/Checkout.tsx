import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import ShoppingCart from "../components/ShoppingCart";
import { useCart } from "../context/cartContext";

function Checkout() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <Center>
        <Flex flexDir='column' py={24} alignItems='center'>
          <Heading size='md' p='4' textTransform='uppercase'>
            Vad tråkigt...
          </Heading>
          <Text>..att din varukorg är tom.</Text>
          <Text>Det kan du ändra på genom att kika på våra produkter.</Text>
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
              Börja shoppa
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
          Dina uppgifter
        </Heading>
      </Center>
      <CustomerForm />
    </>
  );
}

export default Checkout;
