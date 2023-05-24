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
  handleOrderSubmit: (formData: CustomerValues) => void;
}

const OrderContext = createContext<OrderContextProps>(null as any);

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider(props: PropsWithChildren) {
  const [order, setOrder] = useState<Order>();
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

  return (
    <OrderContext.Provider value={{ order, handleOrderSubmit }}>
      {props.children}
    </OrderContext.Provider>
  );
}
