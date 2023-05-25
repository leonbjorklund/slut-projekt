import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CustomerValues } from "../components/CustomerForm";
import { CartItem, useCart } from "./cartContext";

interface Order {
  id: string;
  cart: CartItem[];
  formData: CustomerValues;
  totalPrice: number;
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
    const order: Order = { id: orderId, cart: cart, formData, totalPrice };

    setOrder(order);
    clearCart();
  };

  // const getAllOrders = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/orders", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setOrders(data);
  //     } else {
  //       console.error("Failed to fetch orders:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error while fetching orders:", error);
  //   }
  // };

  const getAllOrders = async () => {
    try {
      const response = await fetch("/http://lapi/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{ order, orders, handleOrderSubmit, getAllOrders }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
