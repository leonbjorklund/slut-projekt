import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import type { Product } from "../../data";
import { useCart } from "../context/cartContext";

function OverviewCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (item: Product) => {
    addToCart(item);
  };

  return (
    <Card
      data-cy='product'
      variant='unstyled'
      maxW='xs'
      align='center'
      bg='brand.100'
      p={4}
      _hover={{
        boxShadow: "2xl",
      }}
    >
      <CardBody>
        <Link to={"/product/" + product.id} key={product.id}>
          <Image
            maxW='95%'
            maxH='100%'
            m={2}
            src={product.image}
            alt={product.title}
          />
        </Link>
        <Flex justifyContent='space-between' pt={3}>
          <Box>
            <Heading fontSize='md' fontWeight='normal' data-cy='product-title'>
              {product.title}
            </Heading>
            <Text data-cy='product-price'>
              {product.price}
              <Text as='span' fontSize='xs'>
                &nbsp;SEK
              </Text>
            </Text>
          </Box>

          <Button
            data-cy='product-buy-button'
            variant='outline'
            colorScheme='orange'
            border='none'
            color='black'
            borderRadius='none'
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
                    {product.title} har lagts till i varukorgen!
                  </Box>
                ),
              });
            }}
            _hover={{ bg: "orange.100" }}
          >
            <Icon boxSize={6} as={IoMdAdd} />
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default OverviewCard;
