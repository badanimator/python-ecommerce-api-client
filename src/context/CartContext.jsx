import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import cartService from "../api/services/cart.service";
import { useUser } from "./UserContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { isLoggedIn } = useUser();

  const cartData = useQuery({
    refetchOnWindowFocus:false,
    queryKey: ['get_cart', isLoggedIn],
    queryFn: async () =>{
      const res = await getCart();
      return res.data;
    }
  })

  const isInCart = (product_id)=>{
    return (cartData.isSuccess)? cartData.data.items.some((item) => item.product.id===product_id): false;
  }

  const getCart = ()=>{
    if (isLoggedIn) {
      return cartService.getUserCart();
    } else {
      return cartService.getGuestCart();
    }
  }
  
  const addItem = (product_id, quantity) => {
    if (isLoggedIn) {
      return cartService.addToUserCart(product_id, quantity);
    } else {
      return cartService.addToGuestCart(product_id, quantity);
    }
  };

  const deleteItem = (product_id) => {
    if (isLoggedIn) {
      return cartService.removeFromUserCart(product_id);
    } else {
      return cartService.removeFromGuestCart(product_id);
    }
  };

  const increment = async (product_id) => {
    if (isLoggedIn) {
      return cartService.incrementUser(product_id);
    } else {
      return cartService.incrementGuest(product_id)
    }
  };
  
  const decrement = async (product_id) => {
    if (isLoggedIn) {
      return cartService.decrementUser(product_id)
    } else {
      return cartService.decrementGuest(product_id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        isInCart,
        addItem,
        deleteItem,
        increment,
        decrement
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
