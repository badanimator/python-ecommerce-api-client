import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import orderService from "../api/services/order.service";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  return <OrderContext.Provider value={{}}>
    {children}
  </OrderContext.Provider>;
};

const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within a OrderProvider");
  }
  return context;
};

export { OrderProvider, useOrders };
