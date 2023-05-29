import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
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
        <Box w='50%' py={8}>
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
          <Stack spacing={6} w='100%'>
            {orders &&
              orders.map((order, index) => (
                <OrderOverview key={index} order={order} />
              ))}
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default MyOrders;
