import { Box, Center, Heading } from "@chakra-ui/react";
import AccessDenied from "../components/AccessDenied";

import ProductForm from "../components/ProductForm";
import { useAccount } from "../context/accountContext";
import { useProducts } from "../context/productContext";

function AddProduct() {
  const { addNewProduct } = useProducts();

  const { user } = useAccount();
  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return <AccessDenied />;
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
