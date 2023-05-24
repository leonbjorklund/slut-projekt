import { Box, Center, Heading } from "@chakra-ui/react";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/productContext";

function AddProduct() {
  const { addNewProduct } = useProducts();

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
