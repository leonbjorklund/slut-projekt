import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomerValues } from "../components/CustomerForm";
import { useAccount, User } from "./accountContext";
import { useCart } from "./cartContext";
import { Product } from "./productContext";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export type OrderNoId = Omit<Order, "_id">;
export interface Order {
  _id: string;
  createdAt: string;
  orderItems: OrderItem[];
  totalPrice: number;
  deliveryAddress: {
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    phoneNumber: string;
  };
  isShipped: boolean;
  userId?: string;
}

interface OrderContextProps {
  order?: Order;
  orders: Order[];
  user?: User;
  handleOrderSubmit: (formData: CustomerValues) => void;
  getAllOrders: () => Promise<void>;
  updateShippingStatus: (orderId: string, isShipped: boolean) => Promise<void>;
  getOrdersByUser: (userID: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextProps>({
  order: undefined,
  orders: [],
  handleOrderSubmit: () => {},
  getAllOrders: () => Promise.resolve(),
  updateShippingStatus: () => Promise.resolve(),
  getOrdersByUser: () => Promise.resolve(),
});

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider(props: PropsWithChildren<any>) {
  const [order, setOrder] = useState<Order>();
  const [orders, setOrders] = useState<Order[]>([]);
  const { cart, clearCart } = useCart();
  const { user } = useAccount();

  const checkAdminAccess = () => {
    return user && user.isAdmin;
  };

  const handleOrderSubmit = async (deliveryAddress: CustomerValues) => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order: OrderNoId = {
      orderItems: cart.map((cartItem) => ({
        product: cartItem,
        quantity: cartItem.quantity,
      })),
      totalPrice,
      createdAt: new Date().toISOString(),
      deliveryAddress,
      isShipped: false,
      userId: user?._id,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setOrder(data);
      clearCart();

      getAllOrders();
    } catch (error) {
      console.error("Failed to create an order:", error);
    }
  };

  const getAllOrders = async () => {
    if (!checkAdminAccess()) {
      return;
    }

    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const updateShippingStatus = async (orderId: string, isShipped: boolean) => {
    if (!checkAdminAccess()) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isShipped }),
      });

      if (response.ok) {
        // Update the local orders state if needed
      } else {
        console.error("Failed to update shipping status:", response.status);
      }
    } catch (error) {
      console.error("Failed to update shipping status:", error);
    }
  };

  const getOrdersByUser = async (userId: string) => {
    if (user && user.email !== userId) {
      return;
    }
    try {
      const response = await fetch(`/api/orders/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getOrdersByUser(user.email);
    } else {
      getAllOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        order,
        orders,
        handleOrderSubmit,
        getAllOrders,
        updateShippingStatus,
        getOrdersByUser,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
