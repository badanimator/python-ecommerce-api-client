import { motion } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle, X } from "react-feather";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useOrders } from "../context/OrderContext";


function OrderConfirmation() {
  const { failed, isSuccess} = useOrders();
  useEffect(() => {
    // dispatch(deleteFromBasket());
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {isSuccess? (
        <div className="flex flex-col place-items-center text-center text-cusblack">
          <CheckCircle className="w-28 h-28 text-green-400" />

          <h1 className="my-2 text-2xl font font-semibold">
            Thanks for your order
          </h1>
          <p className="text-sm my-2 md:w-2/3 leading-relaxed">
            Your order is being processed by our team and you
            should receive a confirmation from us shortly. Click the
            button below to see your orders
          </p>
          <Link to={"/orders"} className="py-2 px-4 text-xs hover:bg-white hover:text-black duration-200 hover:border-black border rounded-lg my-2 bg-black text-white">
            See My Orders
          </Link>
        </div>
      ): failed? (
        <div className="flex flex-col place-items-center text-center text-cusblack">
          <X className="w-28 h-28 text-red-600" />
          <p className="text-sm my-2 md:w-2/3 leading-relaxed">
            You failed to complete your order
          </p>
        </div>
      ):(
        <div className="flex flex-col place-items-center text-center text-cusblack">
          <PacmanLoader className="w-28 h-28" />
          <h1 className="my-2 text-2xl font font-semibold">
            Please wait...
          </h1>
          <p className="text-sm my-2 md:w-2/3 leading-relaxed">
            Your order is being processed by our delivery team and you
            should receive a confirmation from us shortly.
          </p>
        </div>
      )}

    </motion.div>

  );
}

export default OrderConfirmation;
