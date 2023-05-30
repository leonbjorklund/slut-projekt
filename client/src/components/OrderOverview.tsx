import { Box, Card, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Order } from "../context/orderContext";

function OrderOverview({ order }: { order: Order }) {
  return (
    <Card
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
              <Heading as='h3' size='md' mb={2}>
                Order Number: {order._id}
              </Heading>
              <Flex>
                <Text data-cy='product-id' mb={4}>
                  Date: {order.createdAt}
                </Text>
              </Flex>
              <Flex>
                <Text>Order items:</Text>
              </Flex>
              <Grid templateColumns='1fr' gap={1}>
                {order.orderItems.map((orderItem, index) => (
                  <Text key={index}>
                    {orderItem.product?.name} x {""} {orderItem.quantity}
                  </Text>
                ))}
              </Grid>
              <Flex direction='row' justifyContent='space-between'>
                <Text>Total price: {order.totalPrice}</Text>{" "}
                <Text>
                  Shipping status: {order.isShipped ? "Shipped" : "Not Shipped"}
                </Text>
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
