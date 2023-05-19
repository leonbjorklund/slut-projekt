import { Box, Center, Heading, Text } from "@chakra-ui/react";
import OrderCard from "../components/OrderCard";
import { useOrder } from "../context/orderContext";

function OrderConfirmation() {
  const { order } = useOrder();

  return (
    <Center w='100%' flexDirection='column' py={6}>
      <Box py={8}>
        <Heading fontSize='1.5rem'>Tack för din beställning!</Heading>
      </Box>
      <Box
        w='40%'
        borderBottom='1px'
        borderColor='blackAlpha.200'
        pt={6}
        pb={2}
      >
        <Text fontSize='1.1rem'>Ordernummer: {order?.id}</Text>
      </Box>
      {order?.cart.map((cartItem) => (
        <Box key={cartItem.id} w='100%'>
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
          Dina uppgifter
        </Text>
        <Text>{order?.formData.name}</Text>
        <Text>{order?.formData.address}</Text>
        <Text pt={2}>{order?.formData.email}</Text>
        <Text>{order?.formData.phone}</Text>
      </Box>
    </Center>
  );
}

export default OrderConfirmation;
