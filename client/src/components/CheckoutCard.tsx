import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Image,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { CartItem, useCart } from "../context/cartContext";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function CheckoutCard({ product }: { product: CartItem }) {
  const [quantity, setQuantity] = useLocalStorageState<number>(
    product.quantity,
    "cartQuantity-" + product._id,
  );

  const { removeFromCart, updateCartItemQuantity } = useCart();
  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    localStorage.removeItem("cartQuantity-" + id);
  };
  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItemQuantity(product._id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItemQuantity(product._id, newQuantity);
    } else {
      handleRemoveFromCart(product._id);
    }
  };

  return (
    <Card
      data-cy='cart-item'
      direction={{ base: "column", sm: "row" }}
      overflow='hidden'
      size='sm'
      bg='brand.100'
      w='80%'
      variant='unstyled'
      my={2}
      borderBottom='1px'
      borderColor='blackAlpha.200'
      pb={4}
    >
      <Box>
        <Image
          src={product.imageUrl}
          alt={product.name}
          maxW='160px'
          maxH='100%'
          m={2}
        />
      </Box>
      <CardBody py={8}>
        <Flex justifyContent='space-between' h='100%'>
          <Flex pl={4} justifyContent='space-between' flexDirection='column'>
            <Box>
              <Text fontSize='xl' data-cy='product-title'>
                {product.name}
              </Text>
              <Text fontSize='sm'>
                Height: &nbsp;
                {product.height}
                <Text as='span' fontSize='sm'>
                  &nbsp;cm
                </Text>
              </Text>
            </Box>
            <Flex
              justifyContent='center'
              alignItems='center'
              border='1px solid'
              borderColor='yellow.400'
              p={0}
              m={0}
            >
              <Button
                bg='none'
                borderRadius='none'
                data-cy='decrease-quantity-button'
                onClick={decrementQuantity}
                _hover={{ bg: "none", transform: "scale(1.2)" }}
              >
                -
              </Button>

              <Input
                border='none'
                data-cy='product-quantity'
                readOnly
                value={quantity}
                size='sm'
                w='2rem'
              />

              <Button
                bg='none'
                data-cy='increase-quantity-button'
                borderRadius='none'
                onClick={incrementQuantity}
                _hover={{ bg: "none", transform: "scale(1.2)" }}
              >
                +
              </Button>
            </Flex>
          </Flex>
          <Spacer />
          <Flex pr={4} justifyContent='space-between' flexDirection='column'>
            <Button
              bg='none'
              _hover={{ bg: "none", transform: "scale(1.2)" }}
              onClick={() => handleRemoveFromCart(product._id)}
            >
              <Icon boxSize={6} as={AiOutlineDelete} />
            </Button>
            <Text data-cy='product-price'>
              {product.price * product.quantity}
              <Text as='span' fontSize='xs'>
                &nbsp;SEK
              </Text>
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default CheckoutCard;
