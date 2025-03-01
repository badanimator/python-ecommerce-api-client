import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Product = ({ item, ref }) => {

  return (
    <Link to={`/products/${item.slug}`} className="rounded-xl cursor-pointer hover:shadow-lg" ref={ref}>
      <div className="overflow-hidden">
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
      </div>
      <div className="px-2 py-2">
        <p className="text-sm line-clamp-1">{item.name}</p>
        <p className="text-xs my-2 text-gray-400">{item.category.path}</p>
        <p className="text-sm font-semibold">{item.currency} {item.price}</p>
      </div>
    </Link>
  );
};

export default Product;
