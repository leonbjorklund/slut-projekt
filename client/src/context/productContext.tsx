import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type ProductCreate = Omit<Product, "_id" | "imageUrl">;
export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageUrl: string;
  height: number;
  price: number;
  categories: string[];
  inStock: number;
}

interface ProductContextProps {
  products: Product[];
  deleteProduct: (productId: string) => void;
  addNewProduct: (product: ProductCreate) => void;
  editProduct: (productId: string, updatedProduct: ProductCreate) => void;
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
      const response = await fetch("api/products");
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

  const addNewProduct = async (product: ProductCreate) => {
    const productWithCorrectTypes = {
      ...product,
      price: Number(product.price),
      inStock: Number(product.inStock),
    };
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productWithCorrectTypes),
    });

    if (response.ok) {
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } else {
      console.error("Failed to create new product:", response.status);
    }
  };

  const deleteProduct = (productId: string) => {
    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          console.error("Failed to delete product:", response.status);
        }
      })
      .catch((error) => {
        console.error("Failed to delete product:", error);
      });
  };

  const editProduct = async (
    productId: string,
    updatedProduct: ProductCreate,
  ) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updatedProductData = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? updatedProductData : product,
          ),
        );
      } else {
        console.error("Failed to update product:", response.status);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
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
