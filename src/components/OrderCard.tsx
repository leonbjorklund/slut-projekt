import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { CartItem } from "../../data";

interface OrderCardProps {
  cart: CartItem[];
}

function OrderCard({ cart }: OrderCardProps) {
  return (
    <>
      {cart.map((item) => (
        <Card
          key={item.id}
          direction={{ base: "column", sm: "row" }}
          overflow='hidden'
          size='sm'
          bg='brand.100'
          variant='unstyled'
          my={2}
          borderBottom='1px'
          borderColor='blackAlpha.200'
          pb={2}
          w='40%'
        >
          <Box>
            <Image src={item.image} maxW='100px' maxH='100%' m={2} />
          </Box>
          <CardBody px={6}>
            <Flex flexDirection='column' justifyContent='center' h='100%'>
              <Text fontSize={18} pb={4}>
                {item.title}
              </Text>
              <Text fontSize={14}>Antal: {item.quantity} st</Text>
              <Text fontSize={14}>Pris: {item.price} SEK</Text>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default OrderCard;
