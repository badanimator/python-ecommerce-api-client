
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ShoppingCart } from "react-feather";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";


const AddToCartBtn = ({ product_id }) => {
  const { isInCart, addItem, cartData } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e)=>{
    e.preventDefault();
    setIsAdding(true)
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
      <Button disabled={isInCart(product_id)} className="border-0 focus:outline-none rounded">
        <ShoppingCart className="mr-2" />
        Added to Cart
      </Button>
    )  
  }else if(isAdding){
    return (
      <Button iconLeft={ClipLoader} className="border-0 focus:outline-none rounded">
        Lodding...
        {/* <ClipLoader cssOverride={{margin: "0 auto", }} color="#123abc" size={20}/> */}
      </Button>
    )
  }else{
    return (
      <Button
        className="border-0 focus:outline-none rounded"
        onClick={(e) => handleAddToCart(e)}
      >
        <ShoppingCart className="mr-2" />
        Add to Cart
      </Button>    
    )
  }
};

export default AddToCartBtn;
