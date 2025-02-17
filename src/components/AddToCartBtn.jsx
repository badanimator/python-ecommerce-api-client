
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader, Lock, ShoppingBag } from "react-feather";
import { motion } from "framer-motion";

import { useCart } from "../context/CartContext";

const AddToCartBtn = ({ product_id }) => {
  const { isInCart, addItem, cartData } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (product_id)=>{
    try{
      const res = await addItem(product_id, 1);
      return res.data;
    }catch(errors){
      toast.error("Error adding to cart");
    }finally{
      cartData.refetch()
      setIsAdding(false);
    }
  }


  if (isInCart(product_id)){
    return (
      <button
        disabled={isInCart(product_id)}
        className="w-4/5 md:w-3/5 bg-gray-500 overflow-hidden py-4 text-white rounded-lg text-sm active:bg-gray-800 duration-100"
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex justify-center place-items-center overflow-hidden"
        >
          Added to basket
          <span>
            <Lock className="ml-2 w-5 h-5" />
          </span>
        </motion.span>
      </button>
    )  
  }else if(isAdding){
    return (
      <button
        disabled={isAdding}
        className="w-4/5 md:w-3/5 bg-black overflow-hidden py-4 text-white rounded-lg text-sm active:bg-gray-800 duration-100"
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex justify-center place-items-center overflow-hidden"
        >
          Adding...
          <span>
            <Loader className="ml-2 w-5 h-5" />
          </span>
        </motion.span>
      </button>
    )
  }else{
    return (
      <button
        onClick={() => handleAddToCart(product_id)}
        disabled={isInCart(product_id)}
        className="w-4/5 md:w-3/5 bg-black overflow-hidden py-4 text-white rounded-lg text-sm active:bg-gray-800 duration-100"
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex justify-center place-items-center overflow-hidden"
        >
          Add to basket
          <span>
            <ShoppingBag className="ml-2 w-5 h-5" />
          </span>
        </motion.span>
      </button>
    )
  }
};

export default AddToCartBtn;
