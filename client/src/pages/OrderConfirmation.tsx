import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import OrderCard from "../components/OrderCard";
import { useOrder } from "../context/orderContext";
import useCalculateTotalPrice from "../hooks/useCalculateTotalPrice";

function OrderConfirmation() {
  const { order } = useOrder();
  const totalPrice = useCalculateTotalPrice(order?.orderItems || []); // Use optional chaining and provide a fallback value

  return (
    <Center w='100%' flexDirection='column' py={6}>
      <Box py={8}>
        <Heading fontSize='1.5rem'>Thank you for your order!</Heading>
      </Box>
      <Box
        w={{ base: "80%", md: "40%" }}
        borderBottom='1px'
        borderColor='blackAlpha.200'
        pt={6}
        pb={2}
      >
        <Text fontSize='1.1rem'>Order number: {order?._id}</Text>
      </Box>
      {order?.orderItems.map((orderItem, index) => (
        <Box key={index} w='100%'>
          <Center>
            <OrderCard order={[orderItem]} />
          </Center>
        </Box>
      ))}
      <Box w={{ base: "80%", md: "40%" }} textAlign='right'>
        <Text fontSize='1.1rem'>Totalt: {totalPrice} SEK</Text>
      </Box>
      <Box
        py={4}
        px={8}
        my={8}
        w={{ base: "90%", md: "40%" }}
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
        <Text>{order?.deliveryAddress.phoneNumber}</Text>
      </Box>
    </Center>
  );
}

export default OrderConfirmation;
