import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Product = ({ item, ref }) => {

  return (
    <Link to={`/details/${item.slug}`} className="rounded-xl cursor-pointer hover:shadow-md" ref={ref}>
      <div className="relative">
        <div className="absolute right-0 top-4">
          <span className="bg-black text-white p-1 rounded-s-md text-sm font-thin"> -{ item.formatted_discounted_percentage }</span>
        </div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{ scale: 1.3, x: 50, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            className="rounded-xl w-full h-48 bg-gray object-contain p-2"
            src={item.thumbnail}
            alt={item.thumbnail}
            loading="lazy"
            decoding="async"
            title={item.name}
          />
        </motion.div>
      </div>
      <div className="px-2 py-2">
        <p className="text-sm line-clamp-1">{item.name}</p>
        <p className="text-xs my-2 text-gray-400">{item.category.path}</p>
        <div className="flex gap-2 flex-col md:flex-row md:items-center">
          <strike className="text-pretty font-thin sm:text-sm text-xs">{item.formatted_price}</strike>
          <p className="text-sm sm:text-lg font-semibold">{item.formatted_discounted_price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
