import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { Order, useOrder } from "../context/orderContext";

interface OrderData extends Order {
  _id: string;
}

function OrderConfirmation() {
  const { order } = useOrder();
  const orderId = order?._id;
  console.log(orderId);

  const [orderData, setOrderData] = useState<OrderData>();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}`,
      );
      if (!response.ok) {
        // if HTTP-status is 404-499 or 500-599
        throw new Error("HTTP status " + response.status);
      }
      const data = await response.json();

      setOrderData(data);
      console.log(data);
    };

    fetchOrder();
  }, [orderId]); // Only re-run the effect if orderId changes

  return (
    <Center w='100%' flexDirection='column' py={6}>
      <Box py={8}>
        <Heading fontSize='1.5rem'>Thank you for your order!</Heading>
      </Box>
      <Box
        w='40%'
        borderBottom='1px'
        borderColor='blackAlpha.200'
        pt={6}
        pb={2}
      >
        <Text fontSize='1.1rem'>Order number: {orderData?._id}</Text>
      </Box>
      {order?.orderItems.map((cartItem) => (
        <Box key={cartItem._id} w='100%'>
          <Center>
            <OrderCard cart={[cartItem]} />
          </Center>
        </Box>
      ))}
      <Box w='40%' textAlign='right'>
        <Text fontSize='1.1rem'>Totalt: {order?.totalPrice} SEK</Text>
      </Box>
      <Box
        py={4}
        px={8}
        my={8}
        w='40%'
        textAlign='left'
        border='1px solid'
        borderColor='yellow.400'
      >
        <Text fontSize='1rem' fontWeight={800} textTransform='uppercase' pb={4}>
          Your information:
        </Text>
        <Flex gap='0.3rem'>
          <Text>{order?.deliveryAddress.firstName}</Text>
          <Text>{order?.deliveryAddress.lastName}</Text>
        </Flex>
        <Text>{order?.deliveryAddress.address}</Text>
        <Text>{order?.deliveryAddress.zipCode}</Text>
        <Text>{order?.deliveryAddress.city}</Text>
        {/* <Text pt={2}>{order?.deliveryAddress.email}</Text> */}
        <Text>{order?.deliveryAddress.phone}</Text>
      </Box>
    </Center>
  );
}

export default OrderConfirmation;
