import { Box, Center, Heading, Text } from "@chakra-ui/react";

import ProductForm from "../components/ProductForm";
import { useAccount } from "../context/accountContext";
import { useProducts } from "../context/productContext";

function AddProduct() {
  const { addNewProduct } = useProducts();

  const { user } = useAccount();
  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return (
      <Center>
        <Box py={8}>
          <Heading as='h2' size='lg' textAlign='center'>
            Access Denied
          </Heading>
          <Text mt={4} textAlign='center'>
            You do not have permission to view this page.
          </Text>
        </Box>
      </Center>
    );
  }

  return (
    <Box>
      <Center>
        <Heading size='md' py={14} textTransform='uppercase'>
          Lägg till ny produkt
        </Heading>
      </Center>
      <Center>
        <ProductForm onSubmit={addNewProduct} />
      </Center>
    </Box>
  );
}

export default AddProduct;
