import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";



function WishProduct({ item }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteWishlistItem, wishlistData } = useWishlist();
  return (
    <div className="mb-4 overflow-hidden">
      <motion.div
        initial={{ scale: 1.5, x: 100, y: -100, opacity: 0 }}
        animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      >
        <img
          className="h-28 rounded-lg object-cover w-full"
          src={item.product.thumbnail}
          alt={item.product.name}
        />
      </motion.div>
      <div className="px-2 py-1 text-black">
        <p className="text-sm line-clamp-1">{item.product.name}</p>
        <p className="text-xs my-1.5">{item.product.currency + item.product.price}</p>
        <Link to={"/products/" + item.product.slug}>
          <button type="button" className="text-white bg-black border border-black py-1 text-xs w-full rounded-lg">
            View product
          </button>
        </Link>
        <button
          disabled={isDeleting}
          onClick={() => {
            setIsDeleting(true);
            deleteWishlistItem(item.product.id).then(
              ()=> wishlistData.refetch()
            ).finally(()=> setIsDeleting(false))
          }}
          className="text-black mt-1.5 bg-white border border-black py-1 text-xs w-full rounded-lg"
        >
          {isDeleting? "Removing...":"Remove"}
        </button>
      </div>
    </div>
  );
}

export default WishProduct;
