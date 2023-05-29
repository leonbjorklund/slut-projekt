import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../context/cartContext";
import { Product } from "../context/productContext";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (item: Product) => {
    addToCart(item);
  };

  return (
    <Flex justifyContent='center' alignItems='center'>
      <Card
        maxW='800px'
        direction={{ base: "column", sm: "row" }}
        overflow='hidden'
        boxShadow='none'
        borderRadius='0'
        margin='30px'
        bg='transparent'
      >
        <Flex flex={1}>
          <Image
            objectFit='cover'
            width='100%'
            maxW={{ base: "100%", sm: "100%" }}
            minW='200px'
            src={product.imageUrl}
            alt={product.name}
          />
        </Flex>
        <Flex flex={1} alignItems='center' justifyContent='space-between'>
          <Stack maxW='450px' spacing='5px'>
            <CardBody>
              <Heading
                data-cy='product-title'
                margin='3px 10px 10px 10px'
                fontSize='xl'
                fontWeight='normal'
              >
                {product.name}
              </Heading>
              <Text margin='3px 10px 10px 10px'>
                Height: {product.height}
                <Text as='span' fontSize='sm'>
                  &nbsp;cm
                </Text>
              </Text>

              <Text
                data-cy='product-description'
                margin='3px 10px 10px 10px'
                py='2'
              >
                {product.description}
              </Text>

              <Text
                data-cy='product-price'
                fontSize='xl'
                margin='3px 10px 10px 10px'
              >
                {product.price}
                <Text as='span' fontSize='sm'>
                  &nbsp;SEK
                </Text>
              </Text>
            </CardBody>

            <CardFooter flexDirection={{ base: "column", md: "row" }}>
              <Button
                onClick={() => {
                  handleAddToCart(product);
                  toast({
                    position: "bottom-right",
                    duration: 2000,
                    render: () => (
                      <Box
                        data-cy='added-to-cart-toast'
                        color='green.500'
                        p={3}
                        bg='white'
                      >
                        {product.name} has been added to the cart!
                      </Box>
                    ),
                  });
                }}
                data-cy='product-buy-button'
                variant='outline'
                colorScheme='yellow'
                borderColor='yellow.400'
                color='black'
                borderRadius='none'
                borderWidth='2px'
                mr='2'
                height='45px'
                _hover={{ bg: "yellow.400" }}
                m={{ base: "10px", sm: "2px" }}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Stack>
        </Flex>
      </Card>
    </Flex>
  );
}

export default ProductCard;
