import { Box, Center, Heading, Text } from "@chakra-ui/react";

function AccessDenied() {
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

export default AccessDenied;
