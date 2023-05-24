import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useAccount } from "../context/accountContext";
import { Product, useProducts } from "../context/productContext";

function Edit() {
  const { products, editProduct } = useProducts();
  const params = useParams();
  const editProductInfo = products.find((product) => product._id === params.id);

  const handleSubmit = (updatedProduct: Product) => {
    editProduct(params.id as string, updatedProduct);
  };

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
    <Center>
      <Box>
        <Center>
          <Heading size='md' py={14} textTransform='uppercase'>
            Redigera produkt
          </Heading>
        </Center>
        <ProductForm product={editProductInfo} onSubmit={handleSubmit} />
      </Box>
    </Center>
  );
}

export default Edit;
