import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  height: number;
  price: number;
  categories: string[];
  inStock: number;
}

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (response.ok) {
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
      } else {
        console.error("Failed to fetch products:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addNewProduct = async () => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newProduct = await response.json();
      setProducts(newProduct);
    } else {
      console.error("Failed to create new product:", response.status);
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  const editProduct = (productId: string, updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product._id === productId ? updatedProduct : product,
      ),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products: products,
        deleteProduct,
        addNewProduct,
        editProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
