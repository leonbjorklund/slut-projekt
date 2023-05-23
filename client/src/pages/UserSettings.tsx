import {
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

function UserSettings() {
  return (
    <>
      <Center>
        <Box w='50%' py={8}>
          <Flex
            justifyContent='center'
            alignItems='center'
            mb={4}
            borderBottom='1px solid black'
            direction='column'
          >
            <Heading as='h5' size='lg' textTransform='uppercase' mb='2rem'>
              User settings
            </Heading>
            <Heading
              as='h5'
              size='sm'
              textTransform='uppercase'
              display='flex'
              mb='1rem'
            >
              All users
            </Heading>
          </Flex>

          <Stack
            spacing={6}
            w='100%'
            display='flex'
            direction='row'
            justifyContent='space-between'
          >
            <Text>E-mail</Text>
            <Checkbox
              size='lg'
              colorScheme='yellow'
              variant='outline'
              borderColor='black'
            >
              Admin
            </Checkbox>
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default UserSettings;
