import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCart } from "../context/CartContext";
import BasketProduct from "./BasketProduct";

function CartItems() {
  const { cartData } = useCart();
  return (
    <div>
      <p>Your Basket: {cartData.isSuccess? cartData.data.items.length: 0}</p>
      <div className="pt-5 pb-2">
        {cartData.isLoading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        )}
        {cartData?.data?.items.length !== 0?
            cartData?.data?.items.map((item, key) => (
            <BasketProduct key={key} item={item} />
        )):(
        <div className="text-gray-400 text-sm mb-10 mx-auto">
          <img
              className="md:w-1/3 object-cover w-full"
              src="https://i.ibb.co/hWZhd6F/empty-cart-4a7779da-Convert-Image.png"
              alt=""
              // className="mx-auto"
          />
          <p className="text-center">
              Your basket is empty,
              <br />
              to start shopping click{" "}
              <span className="underline">
              <Link to="/">here</Link>
              </span>
          </p>
        </div>
        )}
      </div>
    </div>
  );
}

export default CartItems;
