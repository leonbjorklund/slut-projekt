import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import AlertDialogDelete from "../components/AlertDialog";
import { Product } from "../context/productContext";

function AdminCard({ product }: { product: Product }) {
  return (
    <Card
      data-cy='product'
      key={product._id}
      direction={{ base: "column", sm: "row" }}
      bg='brand.100'
      variant='unstyled'
      my={2}
      borderBottom='1px'
      borderColor='blackAlpha.200'
      pb={4}
      borderRadius='0'
    >
      <Flex direction={{ base: "column", md: "row" }} flex='1'>
        <Image
          objectFit='cover'
          maxW={{ base: "100%", md: "200px" }}
          w='auto'
          src={product.imageUrl}
          alt={product.name}
        />

        <Stack
          p={4}
          justifyContent='space-between'
          alignItems='stretch'
          flex='1'
        >
          <Flex
            direction='row'
            justifyContent={{ base: "center", md: "space-between" }}
          >
            <Box>
              <Heading data-cy='product-title' as='h3' size='md' mb={2}>
                {product.name}
              </Heading>
              <Flex>
                <Text fontWeight='bold'>Product id:&nbsp; </Text>
                <Text data-cy='product-id' mb={3}>
                  {product._id}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight='bold'>Height:&nbsp;</Text>
                <Text mb={3}>
                  {product.height}
                  <Text as='span' fontSize='xs'>
                    &nbsp;cm
                  </Text>
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight='bold'>Price:&nbsp;</Text>
                <Text data-cy='product-price' mb={3}>
                  {product.price}
                  <Text as='span' fontSize='xs'>
                    &nbsp;SEK
                  </Text>
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight='bold' pr={3}>
                  Categories:
                </Text>
                <Badge variant='outline' colorScheme='yellow' mt={1} mb={3}>
                  {product.categories}
                </Badge>
              </Flex>
              <Flex>
                <Text fontWeight='bold'>In stock:&nbsp;</Text>
                <Text mb={3}>
                  {product.inStock}
                  <Text as='span' fontSize='sm'>
                    &nbsp;items
                  </Text>
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Stack>
        <Box mt='5'>
          <Flex
            justifyContent={{ base: "center", md: "space-between" }}
            alignItems='flex-end'
            direction={{ base: "row", md: "column" }}
          >
            <Link to={"product/" + product._id}>
              <Icon
                bg='base.100'
                color='black'
                borderRadius='none'
                data-cy='admin-edit-product'
                boxSize={8}
                as={AiOutlineEdit}
                mb={{ base: -1, md: 7 }}
                mr={{ base: 10, md: 0 }}
                _hover={{ bg: "none", transform: "scale(1.2)" }}
              />
            </Link>
            <AlertDialogDelete productId={product._id} />
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default AdminCard;
