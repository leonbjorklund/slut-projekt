import { Box, Center, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AccessDenied from "../components/AccessDenied";
import ProductForm from "../components/ProductForm";
import { useAccount } from "../context/accountContext";
import { Product, useProducts } from "../context/productContext";

function EditProduct() {
  const { products, editProduct } = useProducts();
  const params = useParams();
  const editProductInfo = products.find((product) => product._id === params.id);

  const handleSubmit = (updatedProduct: Product) => {
    editProduct(params.id as string, updatedProduct);
  };

  const { user } = useAccount();
  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <Center>
      <Box>
        <Center>
          <Heading size='md' py={14} textTransform='uppercase'>
            Edit product
          </Heading>
        </Center>
        <ProductForm product={editProductInfo} onSubmit={handleSubmit} />
      </Box>
    </Center>
  );
}

export default EditProduct;
