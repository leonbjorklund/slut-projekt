import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AccessDenied from "../components/AccessDenied";
import OrderOverview from "../components/OrderOverview";
import { useAccount } from "../context/accountContext";
import { useOrder } from "../context/orderContext";

function MyOrders() {
  const { user } = useAccount();
  const { orders, getOrdersByUser } = useOrder();

  useEffect(() => {
    if (user) {
      getOrdersByUser(user.email);
    }
  }, [user, getOrdersByUser]);

  if (!user) {
    return <AccessDenied />;
  }

  return (
    <>
      <Center>
        <Box w='70%' py={8}>
          <Flex
            justifyContent='center'
            alignItems='center'
            mb={4}
            borderBottom='1px solid black'
            direction={{ base: "column", md: "row" }}
          >
            <Heading as='h5' size='lg' textTransform='uppercase' mb='2rem'>
              My Orders
            </Heading>
          </Flex>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderOverview key={index} order={order} />
            ))
          ) : (
            <Box textAlign='center'>
              <Text>You don't have any orders yet</Text>
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
            </Box>
          )}
        </Box>
      </Center>
    </>
  );
}

export default MyOrders;
