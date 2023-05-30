import {
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialPintarest,
  SlSocialTwitter,
} from "react-icons/sl";

function Footer() {
  return (
    <Flex
      as='footer'
      borderTop='1px'
      borderColor='blackAlpha.200'
      width='100%'
      py={12}
      px={20}
      direction={{ base: "column", md: "row" }}
      textAlign={{ base: "center", md: "left" }}
    >
      <Flex justifySelf='flex-start' direction='column'>
        <Heading size='md' pb={2}>
          By Groove
        </Heading>
        <Link>Payment and delivery</Link>
        <Link>Return and refund</Link>
        <Link>Terms and conditions</Link>
        <Link>FAQ</Link>
      </Flex>
      <Center>
        <Image
          py={{ base: 4, md: 0 }}
          src='/logo.svg'
          maxWidth='150px'
          maxHeight='100%'
        />
      </Center>

      <Flex justifySelf='flex-end' direction='column'>
        <Text fontSize='lg' pb={2}>
          Social media
        </Text>
        <Flex justifyContent='space-between'>
          <Link>
            <Icon boxSize={6} as={SlSocialInstagram} />
          </Link>
          <Link>
            <Icon boxSize={6} as={SlSocialFacebook} />
          </Link>
          <Link>
            <Icon boxSize={6} as={SlSocialTwitter} />
          </Link>
          <Link>
            <Icon boxSize={6} as={SlSocialPintarest} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
