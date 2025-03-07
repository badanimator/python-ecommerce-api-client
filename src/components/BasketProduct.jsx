import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, Lock, Trash } from "react-feather";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

function BasketProduct({ item }) {
  const { decrement, deleteItem, increment, cartData } = useCart();
  const [isDecreasing, setIsDecreasing] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="product md:flex justify-between mb-6 border-b-2 border-b-white hover:border-b-gray-100" suppressHydrationWarning>
      <Link to={"/details/" + item.product.slug}>
        <div className="image md:flex cursor-pointer">
          <motion.div
            initial={{ scale: 1.5, x: 50, y: -50, opacity: 0 }}
            animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          >
            <img
              className="w-full md:w-32 h-32 object-contain rounded-xl p-1 overflow-hidden"
              src={item.product.thumbnail}
              alt={item.product.thumbnail}
            />
          </motion.div>
          <div className="ml-3 flex flex-col text-black justify-between py-2">
            <p className="font-medium line-clamp-1">{item.product.name}</p>
            <ul className="text-xs md:text-sm leading-relaxed text-gray-400">
              { item.variation && <li>SKU: {item.variation.sku}</li> }
              <li>Category: {item.product.category.name}</li>
              <li>Quantity: {item.quantity}</li>
              { item.variation && <li>Size: {item.variation.name}</li> }
            </ul>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-between py-1">
        <span className="font-semibold text-black text-righ">{item.product.formatted_price}</span>
        <div className="flex ml-auto text-black mt-1 md:mt-0">
          {/* decrement */}
          <button
            disabled={item.quantity <= 1 || isDecreasing}
            onClick={() => {
              setIsDecreasing(true);
              decrement(item.product.id).then(() => cartData.refetch()).finally(()=> setIsDecreasing(false))
            }}
            className="border border-black active:bg-gray-800 rounded-sm p-1 hover:bg-black hover:text-white duration-100"
          >
            {
              isDecreasing? <SyncLoader className="w-4 h-4" size={1} />: (item.quantity <= 1)? <Lock className="w-4 h-4" />:<Minus className="w-4 h-4" />
            }
            
          </button>
          {/* increment */}
          <button
            disabled={isIncreasing || (item.product.quantity!==null && (item.quantity >= item.product.quantity))}
            onClick={() => {
              setIsIncreasing(true);
              increment(item.product.id).then(() => cartData.refetch()).finally(()=>setIsIncreasing(false))
              }}
            className="border border-black active:bg-gray-800 rounded-sm p-1 hover:bg-black hover:text-white duration-100 mx-1"
          >
            {isIncreasing? (
              <SyncLoader className="w-4 h-4" size={1}/>
              ):
              (item.product.quantity!==null && (item.quantity >= item.product.quantity))? 
              <Lock className="w-4 h-4" />: <Plus className="w-4 h-4" />}            
          </button>
          {/* deletion */}
          <button
            onClick={() => {
              setIsDeleting(true)
              deleteItem(item.product.id).then(() => cartData.refetch()).finally(()=>{
                setIsDeleting(false);
              })
            }}
            disabled={isDeleting}
            className="border border-black active:bg-gray-800 rounded-sm p-1 hover:bg-black hover:text-white duration-100 text-xs px-2 font-medium"
          >
            {isDeleting? <SyncLoader className="w-4 h-4" size={1} />:<Trash className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketProduct;
