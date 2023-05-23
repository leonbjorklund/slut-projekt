import { Box, Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";

function OrderOverview() {
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
              <Heading data-cy='product-title' as='h3' size='md' mb={2}>
                ORDER NUMBER
              </Heading>
              <Flex>
                <Text data-cy='product-id' mb={4}>
                  Date
                </Text>
              </Flex>
              <Flex>
                <Text>Order items:</Text>
              </Flex>
              <Flex>
                <Text>1 x </Text> <Text> Gaston vas</Text>
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

export default OrderOverview;
