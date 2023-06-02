import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AccessDenied from "../components/AccessDenied";
import AdminCard from "../components/AdminCard";
import { useAccount } from "../context/accountContext";
import { useProducts } from "../context/productContext";

function ProductSettings() {
  const { products } = useProducts();
  const { user } = useAccount();
  const isAdmin = user && user.isAdmin;

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <>
      <Center>
        <Box w={{ base: "90%", md: "80%", lg: "60%" }} py={8}>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            mb={4}
            borderBottom='1px solid black'
            direction={{ base: "column", md: "row" }}
          >
            <Heading as='h5' size='sm' textTransform='uppercase' mb={2}>
              All products
            </Heading>
            <Link to='product/new'>
              <Button
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
                Add new product
              </Button>
            </Link>
          </Flex>
          <Stack spacing={6} w='100%' display='flex' flexDir='column-reverse'>
            {products.map((product) => (
              <AdminCard key={product._id} product={product} />
            ))}
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default ProductSettings;
