import {
  Box,
  Center,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDirection,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import AccessDenied from "../components/AccessDenied";
import { useAccount } from "../context/accountContext";

function UserSettings() {
  const { user, users, getAllUsers, updateUserAdmin } = useAccount();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const isAdmin = user?.isAdmin;

  const boxWidth = useBreakpointValue({
    base: "100%",
    sm: "80%",
    md: "60%",
    lg: "50%",
  });

  const stackDirection: StackDirection | undefined = useBreakpointValue({
    base: "column",
    sm: "row",
  });
  const stackSpacing = useBreakpointValue({ base: 5, sm: 6 });

  if (!isAdmin) {
    return <AccessDenied />;
  }

  const handleAdminStatusChange = async (userId: string, isAdmin: boolean) => {
    await updateUserAdmin(userId, isAdmin);
  };

  return (
    <>
      <Center>
        <Box w={boxWidth} py={8}>
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
            users.map((user, index) => (
              <React.Fragment key={user.email}>
                {index !== 0 && <Divider my={stackSpacing} />}
                <Stack
                  spacing={stackSpacing}
                  w='100%'
                  display='flex'
                  direction={stackDirection}
                  justifyContent='space-between'
                  alignItems='center'
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
              </React.Fragment>
            ))}
        </Box>
      </Center>
    </>
  );
}

export default UserSettings;
