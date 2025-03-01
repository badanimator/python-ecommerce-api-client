import { createContext, useContext } from "react";
import { useUser } from "./UserContext";
import orderService from "../api/services/order.service";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const { isLoggedIn } = useUser();

  const checkout = (phone_number, payment_channel, email, address, city, region)=>{
    if(isLoggedIn){
      return orderService.userCheckout(phone_number, payment_channel, email, address, city, region);
    }else{
      return orderService.guestCheckout(phone_number, payment_channel, email, address, city, region)
    }
  }

  return <OrderContext.Provider value={{checkout}}>
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
