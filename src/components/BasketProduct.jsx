import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, Lock } from "react-feather";
import { useCart } from "../context/CartContext";

function BasketProduct({ item }) {
  const { decrement, deleteItem, increment, cartData } = useCart();

  return (
    <div
      className="product md:flex justify-between mb-6"
      suppressHydrationWarning
    >
      <Link to={"/products/" + item.product.slug}>
        <div className="image md:flex cursor-pointer">
          <motion.div
            initial={{ scale: 1.5, x: 50, y: -50, opacity: 0 }}
            animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          >
            <img
              className="w-full md:w-32 h-32 object-cover rounded-xl"
              src={item.product.thumbnail}
              alt={item.product.name}
            />
          </motion.div>
          <div className="ml-3 flex flex-col text-black justify-between py-2">
            <p className="font-medium line-clamp-1">{item.product.name}</p>
            <ul className="text-xs md:text-sm leading-relaxed text-gray-400">
              <li>SKU: {item.color}</li>
              <li>Category: {item.product.category.name}</li>
              <li>Quantity: {item.quantity}</li>
              <li>Size: {item.selectedSizeProp}</li>
            </ul>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-between py-1">
        <span className="font-semibold text-black text-righ">{item.product.currency} {item.product.price}</span>
        <div className="flex ml-auto text-black mt-1 md:mt-0">
          <button
            disabled={item.quantity >= item.product.quantity}
            onClick={() => increment(item.product.id).then(() => cartData.refetch())}
            className="border border-black active:bg-gray-800 rounded-sm p-1 hover:bg-black hover:text-white duration-100"
          >
            {
              (item.quantity >= item.product.quantity)? <Lock className="w-4 h-4" />:<Plus className="w-4 h-4" />
            }
            
          </button>
          <button
            disabled={item.quantity <= 1}
            onClick={() => decrement(item.product.id).then(() => cartData.refetch())}
            className="border border-black active:bg-gray-800 rounded-sm p-1 hover:bg-black hover:text-white duration-100 mx-1"
          >
            {
              (item.quantity <= 1)? <Lock className="w-4 h-4" />:<Minus className="w-4 h-4" />
            }
            
          </button>
          <button
            onClick={() => deleteItem(item.product.id).then(() => cartData.refetch())}
            className="border border-black active:bg-gray-800 rounded-sm p-1 hover:bg-black hover:text-white duration-100 text-xs px-2 font-medium"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketProduct;
