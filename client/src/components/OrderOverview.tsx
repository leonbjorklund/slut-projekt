import { Box, Card, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Order } from "../context/orderContext";

function OrderOverview({ order }: { order: Order }) {
  const createdAtDate = new Date(order.createdAt).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      width='100%'
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
              <Flex>
                <Heading
                  fontFamily='Montserrat'
                  data-cy='product-title'
                  as='h3'
                  size={{ base: "sm", md: "md" }}
                  flex='1'
                  mb={2}
                >
                  ORDER NUMBER: {order._id}
                </Heading>
              </Flex>
              <Flex>
                <Text fontWeight='bold' mb={2}>
                  Shipping status: {order.isShipped ? "Shipped" : "Not Shipped"}
                </Text>
              </Flex>
              <Flex>
                <Text data-cy='product-id' mb={4}>
                  {createdAtDate}
                </Text>
              </Flex>
              <Flex>
                <Text>Order items:</Text>
              </Flex>
              <Grid templateColumns='1fr' gap={1}>
                {order.orderItems.map((orderItem, index) => (
                  <Text key={index}>
                    {orderItem.quantity} x {""} {orderItem.product?.name}
                  </Text>
                ))}
              </Grid>
              <Flex direction='row' justifyContent='space-between'>
                <Text>Total price: {order.totalPrice}</Text>{" "}
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

export default OrderOverview;
