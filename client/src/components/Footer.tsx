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
      px={28}
      justifyContent='space-between'
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
      <Center
        display={{ base: "none", md: "block" }}
        position='absolute'
        left='50%'
        transform='translateX(-50%)'
        pl={{ base: "25px", sm: "0" }}
      >
        <Image
          src='/logo.svg'
          maxWidth={{ base: "120px", md: "150px" }}
          maxHeight='100%'
        />
      </Center>

      <Flex justifySelf='flex-end' direction='column' pt={{ base: 4, md: 0 }}>
        <Text fontSize='lg' pb={2} display={{ base: "none", md: "block" }}>
          Social media
        </Text>
        <Flex justifyContent={{ base: "center", md: "space-between" }}>
          <Link>
            <Icon
              boxSize={6}
              as={SlSocialInstagram}
              _hover={{ bg: "none", transform: "scale(1.2)" }}
            />
          </Link>
          <Link>
            <Icon
              boxSize={6}
              as={SlSocialFacebook}
              _hover={{ bg: "none", transform: "scale(1.2)" }}
            />
          </Link>
          <Link>
            <Icon
              boxSize={6}
              as={SlSocialTwitter}
              _hover={{ bg: "none", transform: "scale(1.2)" }}
            />
          </Link>
          <Link>
            <Icon
              boxSize={6}
              as={SlSocialPintarest}
              _hover={{ bg: "none", transform: "scale(1.2)" }}
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
