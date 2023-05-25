import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomerValues } from "../components/CustomerForm";
import { CartItem, useCart } from "./cartContext";

interface Order {
  _id: string;
  createdAt: string;
  cart: CartItem[];
  formData: CustomerValues;
  totalPrice: number;
  deliveryAddress: {
    firstName: string;
    lastName: string;
    address: string;
    zipCode: number;
    city: string;
    phoneNumber: string;
  };
}

interface OrderContextProps {
  order?: Order;
  orders?: Order[];
  handleOrderSubmit: (formData: CustomerValues) => void;
  getAllOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextProps>(null as any);

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider(props: PropsWithChildren) {
  const [order, setOrder] = useState<Order>();
  const [orders, setOrders] = useState<Order[]>([]);
  const { cart, clearCart } = useCart();

  const handleOrderSubmit = (formData: CustomerValues) => {
    const orderId = Date.now().toString();
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const order: Order = {
      _id: orderId,
      cart: cart,
      formData,
      totalPrice,
      createdAt: "",
      deliveryAddress: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: 0,
        phoneNumber: "",
      },
    };

    setOrder(order);
    clearCart();
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } else {
        console.error("Failed to fetch products:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // const getAllOrders = async () => {
  //   try {
  //     const response = await fetch("/http://lapi/orders");
  //     const data = await response.json();
  //     console.log(data);
  //     setOrders(data);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // };

  return (
    <OrderContext.Provider
      value={{ order, orders, handleOrderSubmit, getAllOrders }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
