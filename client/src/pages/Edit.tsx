import { Box, Center, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Product } from "../../data";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/productContext";

function Edit() {
  const { products, editProduct } = useProducts();
  const params = useParams();
  const editProductInfo = products.find((product) => product.id === params.id);

  const handleSubmit = (updatedProduct: Product) => {
    editProduct(params.id as string, updatedProduct);
  };

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
