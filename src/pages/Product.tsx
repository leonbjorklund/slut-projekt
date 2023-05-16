import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/productContext";

export function ProductPage() {
  const params = useParams();
  const { products } = useProducts();
  const productVase = products.find((product) => product.id == params["id"]);

  if (!productVase) return <p>product not found</p>;

  return (
    <>
      <Breadcrumbs title={productVase.title} />
      <ProductCard product={productVase} />
    </>
  );
}

export default ProductPage;
