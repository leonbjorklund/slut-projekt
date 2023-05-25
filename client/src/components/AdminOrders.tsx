import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Order } from "../context/orderContext";

function AdminOrders({ order }: { order: Order }) {
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
                  ORDER NUMBER
                </Heading>
                <Button
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
                  Mark as shipped
                </Button>
              </Flex>
              <Flex>
                <Text data-cy='product-id' mb={4}>
                  Date: {order.createdAt}
                </Text>
              </Flex>
              <Flex direction='column'>
                <Text mb={2}>CUSTOMER INFO:</Text>
                <Text>e-mail</Text>
                <Text>
                  {order.deliveryAddress.firstName}{" "}
                  {order.deliveryAddress.lastName}
                </Text>
                <Text>{order.deliveryAddress.address}</Text>
                <Text>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Text>
              </Flex>
              <Flex>
                <Text mb={2}>ORDER INFO:</Text>
              </Flex>
              <Flex>
                <Text>1 x</Text> <Text>Gaston vas</Text>
              </Flex>
              <Flex direction='row' justifyContent='space-between'>
                <Text>Total price:</Text> <Text>Shipping status:</Text>
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
