import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Order, useOrder } from "../context/orderContext";

function AdminOrders({ order }: { order: Order }) {
  const { updateShippingStatus } = useOrder();

  const getStatusText = (isShipped: boolean) => {
    return isShipped ? "Shipped" : "Not Shipped";
  };

  const handleMarkAsShipped = async (orderId: string, isShipped: boolean) => {
    try {
      await updateShippingStatus(orderId, isShipped);
      // Perform any additional actions or state updates
    } catch (error) {
      console.error("Failed to update shipping status:", error);
      // Handle error case
    }
  };

  const createdAtDate = new Date(order.createdAt).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <Card
      data-cy='product'
      direction={{ base: "column", sm: "row" }}
      overflow='hidden'
      bg='brand.100'
      variant='unstyled'
      my={2}
      borderBottom='1px'
      borderColor='blackAlpha.200'
      pb={4}
      borderRadius='0'
    >
      <Flex direction={{ base: "column", md: "row" }} flex='1'>
        <Stack
          p={4}
          justifyContent='space-between'
          alignItems='stretch'
          flex='1'
        >
          <Flex
            direction='row'
            justifyContent={{ base: "center", md: "space-between" }}
          >
            <Box width='100%'>
              <Flex
                flexDirection='row'
                width='100%'
                justifyContent='space-between'
                alignItems='center'
              >
                <Heading data-cy='product-title' as='h3' size='sm'>
                  Order nr: {order._id}
                </Heading>

                <Button
                  onClick={() =>
                    handleMarkAsShipped(order._id, !order.isShipped)
                  }
                  data-cy='admin-add-product'
                  colorScheme='yellow'
                  bg='base.100'
                  borderColor='yellow.400'
                  color='black'
                  borderRadius='none'
                  borderWidth='1.5px'
                  variant='solid'
                  size='sm'
                  w='9rem'
                  mb={2}
                  h='3rem'
                  _hover={{ bg: "orange.100" }}
                >
                  {order.isShipped ? "Undo shipping" : "Mark as shipped"}
                </Button>
              </Flex>
              <Flex>
                <Text data-cy='product-id' mb={4}>
                  {createdAtDate}
                </Text>
              </Flex>
              <Flex direction='column'>
                <Text fontWeight='bold' mb={2}>
                  CUSTOMER INFO:
                </Text>
                <Text mb='1rem' textDecoration='underline'>
                  {order.userId.email}
                </Text>
                <Text>
                  {order.deliveryAddress.firstName}{" "}
                  {order.deliveryAddress.lastName}
                </Text>
                <Text>{order.deliveryAddress.address}</Text>
                <Text mb={4}>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight='bold' mb={1} mt='2rem'>
                  ORDER INFO:
                </Text>
              </Flex>
              <Grid templateColumns='1fr' gap={1}>
                {order.orderItems.map((orderItem, index) => (
                  <Text key={index}>
                    {orderItem.product.name} x {""} {orderItem.quantity}
                  </Text>
                ))}
              </Grid>
              <Flex direction='row' justifyContent='space-between'>
                <Text fontWeight='bold' mt='2rem'>
                  Total price:
                </Text>{" "}
                <Text>Order Status: {getStatusText(order.isShipped)}</Text>
              </Flex>
            </Box>
          </Flex>
        </Stack>
        <Box mt='5'>
          <Flex
            justifyContent={{ base: "center", md: "space-between" }}
            alignItems='flex-end'
            direction={{ base: "row", md: "column" }}
          ></Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default AdminOrders;
