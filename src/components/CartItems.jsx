import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCart } from "../context/CartContext";
import BasketProduct from "./BasketProduct";
import { ShoppingCart } from "react-feather";

function CartItems() {
  const { cartData } = useCart();
  return (
    <div>
      <p>Your Basket: {cartData.isSuccess? cartData.data.items.length: 0}</p>
      <div className="pt-5 pb-2">
        {cartData.isLoading && (
          <div className="grid grid-cols-12 gap-2 mb-10">
            <div className="col-span-6 h-8">
              <div className="grid grid-cols-2 gap-x-2">
                <div className="col-span-1">
                  <Skeleton className="h-28" />
                </div>
                <div className="col-span-1 h-2">
                  <div className="grid grid-4 gap-1">
                    <Skeleton className="h-4"/>
                    <Skeleton className="h-4"/>
                    <Skeleton className="h-4"/>
                    <Skeleton className="h-4"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4"></div>
            <div className="col-span-2 h-28">
              <div className="flex flex-col justify-between gap-2 h-full">
                <Skeleton className="h-4" />
                <div className="h-4 w-full">
                  <div className="grid grid-cols-3 gap-1">
                    <Skeleton className="h-6 w-6"/>
                    <Skeleton className="h-6 w-6"/>
                    <Skeleton className="h-6 w-6"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {cartData?.data?.items.length !== 0?
          cartData?.data?.items.map((item, key) => (
          <BasketProduct key={key} item={item} />
        )):(
        <div className="flex gap-4 flex-col items-center text-sm mb-10 mx-auto opacity-20">
          <ShoppingCart className="w-24 h-24" />
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
