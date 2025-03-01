import Nav from "../components/Nav";
import Header from "../components/Header";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Info, Lock } from "react-feather";

const CartStepper = ({children, title }) => {
  const { cartData } = useCart();

  return (
    <>
      <Header title={title} />
      <div className="w-full min-h-screen bg-gray-200 pb-10">
        <Nav />
        <div className="max-w-6xl mx-auto pt-20 md:px-0">
          <div className="max-w-6xl mx-auto px-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
              <div className="md:col-span-2 md:mr-5">
                <div className="">
                  {children}
                </div>
              </div>

              <div className="mt-10 md:mt-0 col-span-1">
                <div className="rounded-xl bg-white shadow-lg py-6 px-5">
                <h1 className="text-black font-bold text-md">SUMMARY</h1>
                <div className="px-4 py-3 text-xs font-medium flex place-items-center text-gray-400 border border-gray-200 rounded-md my-4">
                    <Info size={15} className="w-5 h-5 mr-3" />
                    DO YOU HAVE PROMO CODE?
                </div>

                <div className="text-sm pt-1 font-semibold pb-2 border-b border-black flex justify-between place-items-center">
                    <p className="">SUBTOTAL</p>
                    { "GH" + cartData.data.cart_subtotal}
                </div>

                <div className="my-3 border-b border-black pb-2">
                    {cartData.data.items.map((item, key) => (
                    <div
                        key={key}
                        className="flex justify-between place-items-center text-sm mb-1"
                    >
                        <p className="pr-3 line-clamp-1">{item.product.name}</p>
                        {item.product.currency + "" + item.product.price}
                    </div>
                    ))}
                    <div className="flex justify-between place-items-center text-sm mb-1">
                    <p>TAX</p>
                    <p>FREE</p>
                    </div>
                </div>

                <div className="flex justify-between place-items-center font-semibold">
                    <p>TOTAL</p>
                    {cartData.data.cart_subtotal}
                </div>

                <button
                    disabled={!cartData.data.items.length}
                    onClick={() => next()} 
                    className="py-2 px-3 disabled:cursor-not-allowed text-white w-full mt-6 rounded-lg bg-black "
                >
                    {!cartData.isLoading ? (
                        <span className="flex justify-center place-items-center">
                        <Lock size={15} className="ml-2 w-4 h-4 text-white" />
                        CHECKOUT
                    </span>
                    ) : (
                    <img
                        className="w-6 h-6 mx-auto"
                        src="https://i.ibb.co/pL1TJSg/Rolling-1s-200px-2.gif"
                        alt=""
                    />
                    )}
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartStepper;
