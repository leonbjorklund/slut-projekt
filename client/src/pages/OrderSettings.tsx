import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import AccessDenied from "../components/AccessDenied";
import AdminOrders from "../components/AdminOrders";
import { useAccount } from "../context/accountContext";
import { useOrder } from "../context/orderContext";

function OrderSettings() {
  const { user } = useAccount();
  const isAdmin = user?.isAdmin;

  const { orders, getAllOrders } = useOrder();

  useEffect(() => {
    getAllOrders();
  }, []);

  if (!isAdmin) {
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
              Order settings
            </Heading>
          </Flex>

          <Heading as='h6' size='md' mb={4}>
            Orders
          </Heading>
          {orders &&
            orders.map((order, index) => (
              <Box key={index} borderWidth='1px' p={4}>
                <Text>OrderID: {order._id}</Text>
                <Text> Date: {order.createdAt} </Text>
                <Text>
                  Adress:
                  {order.deliveryAddress.firstName}
                  {order.deliveryAddress.lastName}
                  {order.deliveryAddress.address}
                  {order.deliveryAddress.zipCode}
                  {order.deliveryAddress.city}
                  {order.deliveryAddress.phoneNumber}
                </Text>
              </Box>
            ))}
          <Stack spacing={6} w='100%'>
            <AdminOrders />
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default OrderSettings;
