import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdminCard from "../components/AdminCard";
import { useProducts } from "../context/productContext";

function Admin() {
  const { products } = useProducts();

  return (
    <>
      <Center>
        <Box w='50%' py={8}>
          <Heading
            as='h5'
            size='lg'
            textTransform='uppercase'
            mb='5rem'
            display='flex'
            justifyContent='center'
          >
            Order settings
          </Heading>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            mb={4}
            borderBottom='1px solid black'
            direction={{ base: "column", md: "row" }}
          >
            <Heading as='h5' size='sm' textTransform='uppercase'>
              Alla produkter
            </Heading>
            <Link to='product/new'>
              <Button
                data-cy='admin-add-product'
                colorScheme='yellow'
                bg='base.100'
                borderColor='yellow.400'
                color='black'
                borderRadius='none'
                borderWidth='1.5px'
                variant='solid'
                size='sm'
                w='13rem'
                mb={5}
                h='3rem'
                _hover={{ bg: "orange.100" }}
              >
                Lägg till ny produkt
              </Button>
            </Link>
          </Flex>
          <Stack spacing={6} w='100%'>
            {products.map((product) => (
              <AdminCard key={product.id} product={product} />
            ))}
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default Admin;
