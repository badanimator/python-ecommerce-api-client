import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Info, Lock } from "react-feather";

import Spinner from "../../components/Spinner";
import Page from "../../layout/Page";
import { useCart } from "../../context/CartContext";
import BasketProduct from "../../components/BasketProduct";

const Cart = () => {
  const { cartData } = useCart();
  const route = useNavigate()
  
  return (
    <>
      {cartData.isLoading && <Spinner size={100} loading />}
      {cartData.isSuccess && (
      <Page>
        <div className="max-w-6xl mx-auto pt-20 px-5">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div className="md:col-span-2 md:mr-5">
              <div className="">
                <div className="shadow-lg rounded-xl bg-black text-white px-5 py-3">
                  <h1 className="font-semibold text-lg md:text-xl mb-1">
                    GET FREE SHIPPING WITH MEMBER+ ON EVERY ORDER
                  </h1>
                  <p className="text-xs mb-1 text-gray-100">
                    Non member receive free-shipping for purchases Rp 1,500,000
                    or more
                  </p>
                </div>
                <div className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg overflow-hidden">
                  <p>Your Basket ({cartData.data.items.length})</p>
                  <div className="pt-5 pb-2">
                    {cartData.data.items.length > 0 &&
                      cartData.data.items.map((item, key) => (
                        <BasketProduct key={key} item={item} />
                    ))}
                    {cartData.data.items.length === 0 && (
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
                  { "GH" + cartData.data.subtotal}
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
                  {cartData.data.subtotal}
                </div>

                <button
                  disabled={!cartData.data.items.length}
                  onClick={()=> route("/checkout")}
                  className="py-2 px-3 disabled:cursor-not-allowed text-white w-full mt-6 rounded-lg bg-black "
                >
                  {!cartData.isLoading ? (
                    <span className="flex justify-center place-items-center">
                      CHECKOUT
                      <Lock size={15} className="ml-2 w-4 h-4 text-white" />
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
      </Page>
    )}
    </>
  )
};

export default Cart;
