import { Box, Center, Flex, Heading } from "@chakra-ui/react";
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
  }, [getAllOrders]);

  if (!isAdmin) {
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
              Order settings
            </Heading>
          </Flex>
          {orders &&
            orders?.map((order, index) => (
              <AdminOrders key={index} order={order} />
            ))}
        </Box>
      </Center>
    </>
  );
}

export default OrderSettings;
