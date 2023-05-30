import { useMemo } from "react";
import { OrderItem } from "../context/orderContext";

function useCalculateTotalPrice(orderItems: OrderItem[]) {
  const totalPrice = useMemo(() => {
    return orderItems.reduce(
      (total, orderItem) =>
        total + orderItem.quantity * orderItem.product.price,
      0,
    );
  }, [orderItems]);

  return totalPrice;
}

export default useCalculateTotalPrice;
