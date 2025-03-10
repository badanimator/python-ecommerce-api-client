import { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";
import orderService from "../api/services/order.service";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const { isLoggedIn } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [msg, setMsg] = useState("");

  const checkout = (phone_number, payment_channel, email, address_line1, address_line2, city, region)=>{
    if(isLoggedIn){
      return orderService.userCheckout(phone_number, payment_channel, email, address_line1, address_line2, city, region);
    }else{
      return orderService.guestCheckout(phone_number, payment_channel, email, address_line1, address_line2, city, region)
    }
  }

  return <OrderContext.Provider value={{
      failed,
      isSuccess,
      msg,
      checkout, 
      setIsSuccess,
      setFailed,
      setMsg
    }}>
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
