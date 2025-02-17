import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "./UserContext";
import wishlistService from "../api/services/wishlist.service";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const { isLoggedIn } = useUser();

  const wishlistData = useQuery({
    refetchOnWindowFocus:false,
    queryKey: ['wishlist', isLoggedIn],
    queryFn: async () =>{
      const res = await getWishlist();
      return res.data;
    }
  })
  
  const isInWishlist = (product_id)=>{
    return (wishlistData.isSuccess)? wishlistData.data.some((item) => item.product.id===product_id): false;
  }

  const getWishlist = ()=>{
    if (isLoggedIn) {
      return wishlistService.getUserWishlist();
    } else {
      return wishlistService.getGuestWishlist();
    }
  }
  
  const addWishlistItem = (product_id) => {
    if (isLoggedIn) {
      return wishlistService.createUserWishlist(product_id)
    } else {
      return wishlistService.createGuestWishlist(product_id);
    }
  };

  const deleteWishlistItem = (product_id) => {
    if (isLoggedIn) {
      return wishlistService.removeUserWishlistItem(product_id);
    } else {
      return wishlistService.removeGuestWishlistItem(product_id);
    }
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        isInWishlist,
        addWishlistItem,
        deleteWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export { WishlistProvider, useWishlist };
