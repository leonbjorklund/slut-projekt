import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";

function Footer() {
  return (
    <Flex
      as='footer'
      borderTop='1px'
      borderColor='blackAlpha.200'
      width='100%'
      py={6}
      px={20}
      direction={{ base: "column", md: "row" }}
      textAlign={{ base: "center", md: "left" }}
    >
      <Flex direction='column'>
        <Heading size='md' pb={2}>
          By Groove
        </Heading>
        <Link>Köpvillkor</Link>
        <Link>Retur och reklamation</Link>
        <Link>FAQ</Link>
      </Flex>
      <Spacer />
      <Center>
        <Image
          py={{ base: 4, md: 0 }}
          src='/logo.svg'
          maxWidth='150px'
          maxHeight='100%'
        />
      </Center>
      <Spacer />

      <Flex direction='column'>
        <Text fontSize='lg' pb={2}>
          Följ oss!
        </Text>
        <Box>
          <Icon boxSize={6} as={SlSocialInstagram} />
          <Icon boxSize={6} as={SlSocialFacebook} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Footer;
