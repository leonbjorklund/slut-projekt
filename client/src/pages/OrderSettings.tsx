import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import AdminOrders from "../components/AdminOrders";
import { useAccount } from "../context/accountContext";

function OrderSettings() {
  const { user } = useAccount();
  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return (
      <Center>
        <Box py={8}>
          <Heading as='h2' size='lg' textAlign='center'>
            Access Denied
          </Heading>
          <Text mt={4} textAlign='center'>
            You do not have permission to view this page.
          </Text>
        </Box>
      </Center>
    );
  }

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
