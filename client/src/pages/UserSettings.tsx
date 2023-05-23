import {
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount } from "../context/accountContext";

function UserSettings() {
  const { users, getAllUsers } = useAccount();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

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

          {users &&
            users.map((user) => (
              <Stack
                key={user.email}
                spacing={6}
                w='100%'
                display='flex'
                direction='row'
                justifyContent='space-between'
              >
                <Text>{user.email}</Text>
                <Checkbox
                  size='lg'
                  colorScheme='yellow'
                  variant='outline'
                  borderColor='black'
                  isChecked={user.isAdmin}
                  // Add event handlers or state management if needed
                >
                  Admin
                </Checkbox>
              </Stack>
            ))}
        </Box>
      </Center>
    </>
  );
}

export default UserSettings;
