import { createContext, PropsWithChildren, useContext } from "react";
import { Product, products } from "../../data";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface ProductContextProps {
  products: Product[];
  deleteProduct: (productId: string) => void;
  addNewProduct: (product: Product) => void;
  editProduct: (productId: string, updatedProduct: Product) => void;
}

const defaultProductContext: ProductContextProps = {
  products: [],
  deleteProduct: () => {
    throw new Error("deleteProduct function must be overridden");
  },
  addNewProduct: () => {
    throw new Error("addNewProduct function must be overridden");
  },
  editProduct: () => {
    throw new Error("editProduct function must be overridden");
  },
};

const ProductContext = createContext<ProductContextProps>(
  defaultProductContext,
);

export const useProducts = () => useContext(ProductContext);

export default function ProductProvider(props: PropsWithChildren) {
  const [productList, setProductList] = useLocalStorageState(
    products,
    "products",
  );

  const deleteProduct = (productId: string) => {
    setProductList(productList.filter((product) => product.id !== productId));
  };

  const addNewProduct = (product: Product) => {
    setProductList([...productList, product]);
  };

  const editProduct = (productId: string, updatedProduct: Product) => {
    setProductList(
      productList.map((product) =>
        product.id === productId ? updatedProduct : product,
      ),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products: productList,
        deleteProduct,
        addNewProduct,
        editProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
