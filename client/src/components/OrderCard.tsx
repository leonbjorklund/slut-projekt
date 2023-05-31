import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { OrderItem } from "../context/orderContext";

interface OrderCardProps {
  order: OrderItem[];
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <>
      {order.map((item) => (
        <Card
          key={item.product._id}
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
            <Image src={item.product.imageUrl} maxW='100px' maxH='100%' m={2} />
          </Box>
          <CardBody px={6}>
            <Flex flexDirection='column' justifyContent='center' h='100%'>
              <Text fontSize={18} pb={4}>
                {item.product.name}
              </Text>
              <Text fontSize={14}>Quantity: {item.quantity} </Text>
              <Text fontSize={14}>Price: {item.product.price} SEK</Text>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default OrderCard;
