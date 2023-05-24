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
  const { user, users, getAllUsers, updateUserAdmin } = useAccount();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

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

  const handleAdminStatusChange = async (userId: string, isAdmin: boolean) => {
    try {
      await updateUserAdmin(userId, isAdmin);
      // Optionally, you can update the user list by calling getAllUsers()
    } catch (error) {
      console.error("Error updating user admin status:", error);
    }
  };

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
                borderBottom='1px solid black'
                p='1.5rem'
              >
                <Text>{user.email}</Text>
                <Checkbox
                  size='lg'
                  colorScheme='yellow'
                  variant='outline'
                  borderColor='black'
                  isChecked={user.isAdmin}
                  onChange={(e) =>
                    handleAdminStatusChange(user._id, e.target.checked)
                  }
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
