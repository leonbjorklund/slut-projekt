import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import AdminOrders from "../components/AdminOrders";

function OrderSettings() {
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
              Order settings
            </Heading>
          </Flex>
          <Stack spacing={6} w='100%'>
            <AdminOrders />
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default OrderSettings;
