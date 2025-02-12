import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Loader } from "react-feather";
import { useCart } from "../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Product = ({ item, ref }) => {
  const initialQuantity = 1;
  const { isInCart, addItem, cartData } = useCart();
  const [productId, setProductId] = useState(undefined);

  const add_to_cart = useQuery({
    enabled:productId !== undefined,
    queryKey: ["add_to_cart", productId],
    queryFn: async ()=>{
      try{
        const res = await addItem(productId, initialQuantity);
        return res.data;
      }catch(errors){
        toast.error("Error adding to cart");
      }finally{
        cartData.refetch()
        setProductId(undefined);
      }
    }
  })

  return (
    <div className="rounded-xl cursor-pointer" ref={ref}>
      <div className="overflow-hidden cursor-default rounded-xl relative group">
        <motion.div
          initial={{ scale: 1.3, x: 50, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            className="rounded-xl w-full h-48 bg-gray object-contain"
            src={item.thumbnail}
            alt={item.name}
            loading="lazy"
            decoding="async"
            title={item.name}
          />
        </motion.div>
        <div className="hidden absolute rounded-xl h-full w-full bg-gray-500 backdrop-filter backdrop-blur-sm bg-opacity-30 top-0 group group-hover:flex justify-center place-items-center z-10">
          <div className="flex overflow-hidden cursor-pointer">
            {
              isInCart(item.id)? (
                <button
                  onClick={() => setProductId(item.id)}
                  disabled={isInCart(item.id)}
                  className="p-2 bg-white hover:bg-gray-100 active:bg-gray-200 rounded-lg"
                >
                  <ShoppingBag />
                </button>
              ):(
                <button
                  onClick={() => setProductId(item.id)}
                  disabled={add_to_cart.isLoading}
                  className="p-2 bg-white hover:bg-gray-100 active:bg-gray-200 rounded-lg"
                >
                  {add_to_cart.isLoading? <Loader />: <Plus />}
                </button>
              )
            }
          </div>
        </div>
      </div>
      <Link className="px-2 py-2" to={`/products/${item.slug}`}>
        <p className="hover:underline text-sm line-clamp-1">{item.name}</p>
        <p className="text-xs my-2 text-gray-400">{item.category.name}</p>
        <p className="text-sm font-semibold">{item.currency} {item.price}</p>
      </Link>
    </div>
  );
};

export default Product;
