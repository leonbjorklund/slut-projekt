import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import OrderOverview from "../components/OrderOverview";

function MyOrders() {
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
              My Orders
            </Heading>
          </Flex>
          <Stack spacing={6} w='100%'>
            <OrderOverview />
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default MyOrders;
